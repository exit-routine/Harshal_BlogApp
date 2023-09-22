class AddLikeCountToBlogs < ActiveRecord::Migration[7.0]
  def change
    add_column :blogs, :like_count, :integer ,default:0
  end
end
