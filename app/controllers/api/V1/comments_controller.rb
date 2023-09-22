class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :authenticate_user
  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  def getCommentsOfBlog
    @comments=Comment.where("blog_id":params[:blog_id])
    @comments=@comments.order(created_at: :desc)
    
    render json:{data:@comments,success:true,msg:"fetched all comments"}
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)
     user=User.find(@comment.user_id)
     blog=Blog.find(@comment.blog_id)
     blog.comments_count=blog.comments_count+1;
     blog.save
     @comment.user_name=user.name
    if @comment.save
      render json:{data:@comment,success:true,msg:"new comment added successfully"}
    else
      render json: {msg:@comment.errors,success:false}
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    if @comment.destroy
      render json:{msg:"comment deleted successfully",success:true}
    else 
      render json:{msg:@comment.errors,success:false}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:user_id, :blog_id, :comments)
    end
end
