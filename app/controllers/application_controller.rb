class ApplicationController < ActionController::API
     # Your controller actions
  
     private
  
     def authenticate_user
       # Extract the token from the Authorization header
       header = request.headers['Authorization']
       token = header.split(' ').last if header
   
       if token
         begin
           # Decode and verify the token using your JwtService
           decoded_token = JwtService.decode(token)
   
           # Extract the user_id from the token's payload
           user_id = decoded_token[0]['user_id']
   
           # Find the user associated with the user_id
           @current_user = User.find(user_id)
         rescue JWT::DecodeError => e
           render json: { success:false,msg: 'Invalid token' }, status: :unauthorized
         end
       else
         render json: { error: 'Token missing' }, status: :unauthorized
       end
     end
end
