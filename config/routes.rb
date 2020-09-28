# Rails.application.routes.draw do
#   [HTTPメソッド] '[URIパターン]', to: '[コントローラー名]#[アクション名]'
#  end

Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
end