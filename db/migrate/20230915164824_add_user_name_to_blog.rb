class AddUserNameToBlog < ActiveRecord::Migration[7.0]
  def change
    add_column :blogs, :user_name, :string
  end
end
