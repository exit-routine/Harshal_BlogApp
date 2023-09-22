class User < ApplicationRecord
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
                    validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    length: { maximum: 105 },
                    format: { with: VALID_EMAIL_REGEX }
    validates :password, presence: true, length: { minimum: 6 }
    validates :name,presence: true
    has_secure_password
    enum role: { user: "user", admin: "admin"}
    has_many :blogs ,dependent: :destroy
    has_many :likes ,dependent: :destroy
    has_many :comments ,dependent: :destroy
end
