class CreateBlogs < ActiveRecord::Migration[7.0]
  def change
    create_table :blogs do |t|
      t.string :genre
      t.string :title
      t.text :information
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
