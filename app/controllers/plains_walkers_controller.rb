class PlainsWalkersController < ApplicationController
  before_action :set_plains_walker, only: [:show, :edit, :update, :destroy]

  # GET /plains_walkers
  # GET /plains_walkers.json
  def index
    @plains_walkers = PlainsWalker.all
  end

  # GET /plains_walkers/1
  # GET /plains_walkers/1.json
  def show
  end

  # GET /plains_walkers/new
  def new
    @plains_walker = PlainsWalker.new
  end

  # GET /plains_walkers/1/edit
  def edit
  end

  # POST /plains_walkers
  # POST /plains_walkers.json
  def create
    @plains_walker = PlainsWalker.new(plains_walker_params)

    respond_to do |format|
      if @plains_walker.save
        format.html { redirect_to @plains_walker, notice: 'Plains walker was successfully created.' }
        format.json { render :show, status: :created, location: @plains_walker }
      else
        format.html { render :new }
        format.json { render json: @plains_walker.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /plains_walkers/1
  # PATCH/PUT /plains_walkers/1.json
  def update
    respond_to do |format|
      if @plains_walker.update(plains_walker_params)
        format.html { redirect_to @plains_walker, notice: 'Plains walker was successfully updated.' }
        format.json { render :show, status: :ok, location: @plains_walker }
      else
        format.html { render :edit }
        format.json { render json: @plains_walker.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /plains_walkers/1
  # DELETE /plains_walkers/1.json
  def destroy
    @plains_walker.destroy
    respond_to do |format|
      format.html { redirect_to plains_walkers_url, notice: 'Plains walker was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def login
    plains_walker = PlainsWalker.find_by_name(params[:name])
    
    # 1. Plainswalker name does exist, check if its password is right.
    # 2. Plainswalker name doesnt exist, create him! Or her.
    if plains_walker
      if plains_walker.password == params[:password]
        render json: { success: true, status: "Authentication successful.", plains_walker: plains_walker }
      else
        render json: { success: false, status: "Fuck you, you fucking hackr."}
      end
    else
      # create a new one!
      plains_walker = PlainsWalker.new
      plains_walker.name = params[:name]
      plains_walker.password = params[:password]
      plains_walker.save
      
      render json: { success: true, status: "YOUR JOURNEY BEGINS. PLUTOS A PLANET", plains_walker: plains_walker }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plains_walker
      @plains_walker = PlainsWalker.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def plains_walker_params
      params.require(:plains_walker).permit(:name, :password, :avatarUrl)
    end
end
