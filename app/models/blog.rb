class Blog < ApplicationRecord
  enum genre: { technology: "technology", sport: "sport", spiritual:"spiritual" , random: "random" }
  belongs_to :user
  has_many :likes ,dependent: :destroy
  has_many :comments ,dependent: :destroy
end
