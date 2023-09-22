class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  # before_action :authorized , except:[:create ,:login]
  before_action :alreadyExist, only: [:create]
  before_action :authenticate_user, only: [:user_data]

  #Post login

  def login
    user=User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)
      render json: {data:token,success:true,msg:'welcome #{user.name}'}
    else
      render json: {success:false,msg:"email or password is wrong try again"}
    end
  end
 
  def index
    @users = User.all
    @users=@users.order(:role )
    if @users
     render json: {data:@users,success:true}
    else 
      render json:{msg:@users.error,success:false}
    end
  end

  
  def user_data
    
    render json: {success:true,data:@current_user}
  end

  


  def create
     

    @user = User.new(user_params)
    
    if @user.save
     
      render json:{success:true , msg:"user created successfully"}
    else
      render json: {success:false, msg:@user.errors.full_messages}
    end
  end


  def update
    
    
    if @user.update(user_params)
      
      render json: {data:@user,success:true}
    else
      render json: {msg:@user.errors,success:false}
    end
  end

  
  def destroy

    @user.destroy
    render json: {success:true,msg:"user deleted successfully"}
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :password, :email,:role)
    end

    def alreadyExist
      @user=User.find_by(email: params[:email])
      render json: {success:false , msg:"this email is already used"} if @user
    end
 
  
end
