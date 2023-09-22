class Api::V1::BlogsController < ApplicationController
  before_action :set_blog, only: %i[ show update destroy  ]
  before_action :authenticate_user

  # GET /blogs
  def index
    @blogs = Blog.all
     
    render json: {data:@blogs,success:true,msg:"all bloges fetched"}
  end

  # GET /blogs of current user
  def userBlogs
    blogs=Blog.where('user_id':@current_user.id)
    blogs=blogs.order(created_at: :desc) 
    if blogs
      
      render json:{data:blogs,success:true,count:blogs.count}
    else 
     render json: {success:false,msg:"something went wrong"}
    end
  end

  def getBlogsByChoice
   
    blogs=Blog.where('genre':params[:genre])
    blogs=blogs.order(created_at: :desc) 
    if blogs 
      render json:{data:blogs,success:true,count:blogs.count}
    else 
      render json: {success:false,msg:"something went wrong"}
    end
  end

  # GET /blogs/1
  def show
    
    if @blog
      blog=@blog
     render json: {data:blog,success:true}
    else 
      render json: {success:false,msg:@blog.error}
    end
  end

  # POST /blogs
  def create
    @blog = Blog.new(blog_params)
     user=User.find(@blog.user_id)
     @blog.user_name=user.name
    if @blog.save
      user=User.find(@blog.user_id)
      render json: {data:@blog, success:true, msg:"blog created successfully"}
    else
      render json: {msg:@blog.errors,success:false}
    end
  end

  # PATCH/PUT /blogs/1
  def update
    if @blog.update(blog_params)
      render json: {data:@blog,success:true,msg:"blog updated successfully"}
    else
      render json: {msg:@blog.errors, success:false}
    end
  end

  # DELETE /blogs/1
  def destroy 
    @blog.destroy
    render json: {success:true,msg:"blog deleted successfully"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def blog_params
      params.require(:blog).permit(:genre, :title, :information, :user_id, :user_name)
    end
end
