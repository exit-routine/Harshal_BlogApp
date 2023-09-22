class JwtService

    class << self

        def encode(payload)
            JWT.encode(payload,Rails.application.config.jwt_secret_key,'HS256')
        end

        def decode(token)
            JWT.decode(token,Rails.application.config.jwt_secret_key,true,algorithm:'HS256')
        end
    end

end