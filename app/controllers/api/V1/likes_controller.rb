class Api::V1::LikesController < ApplicationController
     before_action :set_like, only: %i[ ]
     before_action :authenticate_user
  
    # POST /blogs
    def likePost
      @like = Like.new(like_params)
      blog=Blog.find_by("id":@like.blog_id)
      blog.like_count=blog.like_count+1;
      blog.save
      if @like.save
       
        render json: {data:@like, success:true, msg:"liked successfully"}
      else
        render json: {msg:@like.errors,success:false}
      end
    end

    def getAllUserLikes
        likes=Like.where("blog_id":params[:blog_id])
        likes = likes.pluck(:user_id)
        render json: {data:likes,success:true}
    end

    def disLikePost
     
     blog=Blog.find(params[:blog_id])
     if blog.like_count >0
      blog.like_count=blog.like_count-1;
      blog.save
     end
      @like=Like.find_by('blog_id':params[:blog_id])

      if(!@like)
        render json:{success:false,msg:"not found"}
     
      
      elsif @like
        @like.destroy
        @like.save
        render json:{success:true,msg:"unliked successfully"}
      else
        render json: {success:false,msg:@like.errors}
      end
     

    end
  
  
  
    
  
    private
      
      def set_like
        @like = Like.find(params[:id])
      end
  
    
      def like_params
        params.permit( :blog_id, :user_id)
      end
  end