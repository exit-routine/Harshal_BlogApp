Rails.application.routes.draw do
  
 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      resources :blogs 
      resources :users
      resources :comments
      post "/add-like", to: "likes#likePost"
      post "/dis-like", to: "likes#disLikePost"
      get "/getBlogs", to: "blogs#userBlogs"
      post "/users_likes_post", to: "likes#getAllUserLikes"
      post "/blogComments" , to: "comments#getCommentsOfBlog"
      post "/login" , to: "users#login"
      post "/getdata" ,to:"users#user_data"
      post "/choice-data",to: "blogs#getBlogsByChoice"
    end
  end
end
