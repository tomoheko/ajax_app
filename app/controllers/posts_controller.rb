class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end
  def create
    post = Post.create(content: params[:content], checked: false)
    # 既読や未読の情報を追加したため、メモ作成時に未読の情報を保存(checked:false)
    # redirect_to action: :index  Ajaxを実現するため、レスポンスをJSONに変更
    render json:{ post: post }   
  end
  def checked
    # binding.pry
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    item = Post.find(params[:id])
    render json: { post: item }
  end

end