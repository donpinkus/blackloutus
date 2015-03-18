require 'test_helper'

class PlainsWalkersControllerTest < ActionController::TestCase
  setup do
    @plains_walker = plains_walkers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:plains_walkers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create plains_walker" do
    assert_difference('PlainsWalker.count') do
      post :create, plains_walker: { avatarUrl: @plains_walker.avatarUrl, name: @plains_walker.name, password: @plains_walker.password }
    end

    assert_redirected_to plains_walker_path(assigns(:plains_walker))
  end

  test "should show plains_walker" do
    get :show, id: @plains_walker
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @plains_walker
    assert_response :success
  end

  test "should update plains_walker" do
    patch :update, id: @plains_walker, plains_walker: { avatarUrl: @plains_walker.avatarUrl, name: @plains_walker.name, password: @plains_walker.password }
    assert_redirected_to plains_walker_path(assigns(:plains_walker))
  end

  test "should destroy plains_walker" do
    assert_difference('PlainsWalker.count', -1) do
      delete :destroy, id: @plains_walker
    end

    assert_redirected_to plains_walkers_path
  end
end
