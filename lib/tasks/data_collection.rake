namespace :data_collection do
  desc "TODO"
  task angel: :environment do
    require 'open-uri'
    require 'json'
    require 'pp'

    last_page = 303
    page = 1

    while (page <= 303)
      # Get Jobs
      path = "https://api.angel.co/1/jobs?access_token=eb754e725a3e3db031a51d18f831e878415d71501a0840d2&page=" + page.to_s

      buffer = open(path).read
      result = JSON.parse(buffer)
      puts result["jobs"].count

      result["jobs"].each do |j|
        puts "\n\n JOB: " + j["id"].to_s

        # Check if job exists
        if Job.exists?(angel_id: j["id"])
          puts "Job " + j["id"].to_s + " already exists in DB".
          next
        end

        puts "Saving Job"

        job = Job.new
        job.angel_id = j["id"]
        job.company_angel_id = j["startup"]["id"]

        job.title = j["title"]
        job.description = j["description"]
        job.listing_created_at = j["created_at"]
        job.listing_updated_at = j["updated_at"]
        job.equity_min = j["equity_min"]
        job.equity_max = j["equity_max"]
        job.currency_code = j["currency_code"]
        job.job_type = j["job_type"]
        job.salary_min = j["salary_min"]
        job.salary_max = j["salary_max"]
        job.angellist_url = j["angellist_url"]


        location = nil
        j["tags"].each do |t|
          if t["tag_type"] == "LocationTag"
            location = t["name"]
          end
        end
        job.location = location

        role = nil
        j["tags"].each do |t|
          if t["tag_type"] == "RoleTag"
            role = t["name"]
          end
        end
        job.role = role


        if job.save
          puts "Saved a new job. \n\n"

          # Tags
          puts "Tags count:"
          puts j["tags"].count
          j["tags"].each do |tag|
            puts "Saving Job Tag ID: " + tag["id"].to_s

            if !AngelTag.exists?(angel_id: tag["id"])
              puts "Saving AngelTag"
              angel_tag = AngelTag.new
              angel_tag.angel_id = tag["id"]
              angel_tag.tag_type = tag["tag_type"]
              angel_tag.name = tag["name"]
              angel_tag.display_name = tag["display_name"]
              angel_tag.angellist_url = tag["angellist_url"]

              angel_tag.save!
              puts "saved AngelTag\n\n"
            else
              puts "Tag " + tag["id"].to_s + " exists"
              angel_tag = AngelTag.find_by_angel_id(tag["id"])
            end

            if !AngelTagging.exists?(angel_tag_id: angel_tag.id, angel_taggable_id: job.id, angel_taggable_type: "job")
              angel_tagging = AngelTagging.new
              angel_tagging.angel_tag_id = angel_tag.id
              angel_tagging.angel_taggable_id = job.id
              angel_tagging.angel_taggable_type = "job"
              angel_tagging.save!
              puts "Saved AngelTagging \n\n"
            else
              puts "AngelTagging already existed. Error?"
            end
          end

          # Skills
          j["tags"].each do |t|
            if t["tag_type"] == "SkillTag"
              puts "Saving JobSkill"
              skill = JobSkill.new
              skill.angel_id = t["id"]
              skill.name = t["name"]
              skill.job_id = job.id
              if skill.save
                puts "Saved JobSkill"
              else
                puts "-- SKILL FAILED TO SAVE --"
              end
            end
          end

          # Company
          company_angel_id = job.company_angel_id

          if !Company.exists?(angel_id: company_angel_id)
            puts "Getting company info for #{company_angel_id}"

            company = Company.new
            company.angel_id = company_angel_id

            response = HTTParty.get("https://api.angel.co/1/startups/#{company_angel_id}?access_token=eb754e725a3e3db031a51d18f831e878415d71501a0840d2")

            puts "got company info"

            if response.code == 404
              puts "This company no longer exists."
              company.deleted = true
              company.save
              next
            elsif response.code == 403
              puts "Over rate limit."
              break
            end

            company_result = JSON.parse(response.body)

            # Set company info
            company.hidden = company_result["hidden"]
            company.community_profile = company_result["community_profile"]
            company.name = company_result["name"]
            company.angellist_url = company_result["angellist_url"]
            company.logo_url = company_result["logo_url"]
            company.thumb_url = company_result["thumb_url"]
            company.quality = company_result["quality"]
            company.product_desc = company_result["product_desc"]
            company.high_concept = company_result["high_concept"]
            company.follower_count = company_result["follower_count"]
            company.company_url = company_result["company_url"]
            company.angel_created_at = company_result["angel_created_at"]
            company.angel_updated_at = company_result["angel_updated_at"]
            company.twitter_url = company_result["twitter_url"]
            company.blog_url = company_result["blog_url"]
            company.video_url = company_result["video_url"]

            company.save

            puts "company saved"
          else
            puts job.errors.full_messages
          end
        end
      end

      page = page + 1
    end
  end

  task populate_angel_companies: :environment do
    # response = HTTParty.get('https://api.stackexchange.com/2.2/questions?site=stackoverflow')

    # puts response.body, response.code, response.message, response.headers.inspect

    company_angel_ids = Job.uniq.pluck(:company_angel_id)

    company_angel_ids.each do |angel_id|
      puts angel_id

      if !Company.exists?(angel_id: angel_id)
        puts "Getting company info for #{angel_id}"

        company = Company.new
        company.angel_id = angel_id

        # Fetch company info.
        response = HTTParty.get("https://api.angel.co/1/startups/#{angel_id}?access_token=eb754e725a3e3db031a51d18f831e878415d71501a0840d2")

        puts "Response Code:"
        puts response.code

        if response.code == 404
          puts "This company no longer exists."
          company.deleted = true
          company.save
          next
        elsif response.code == 403
          puts "Over rate limit."
          break
        end

        company_result = JSON.parse(response.body)

        # Set company info
        company.hidden = company_result["hidden"]
        company.community_profile = company_result["community_profile"]
        company.name = company_result["name"]
        company.angellist_url = company_result["angellist_url"]
        company.logo_url = company_result["logo_url"]
        company.thumb_url = company_result["thumb_url"]
        company.quality = company_result["quality"]
        company.product_desc = company_result["product_desc"]
        company.high_concept = company_result["high_concept"]
        company.follower_count = company_result["follower_count"]
        company.company_url = company_result["company_url"]
        company.angel_created_at = company_result["angel_created_at"]
        company.angel_updated_at = company_result["angel_updated_at"]
        company.twitter_url = company_result["twitter_url"]
        company.blog_url = company_result["blog_url"]
        company.video_url = company_result["video_url"]

        company.save
      end
    end
  end
end



















