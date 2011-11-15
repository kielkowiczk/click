module ApplicationHelper
  def logged_in?
    if cookies.has_key? "fbsr_#{FB_APP_ID}" then
      @user = Koala::Facebook::OAuth.new FB_APP_ID, FB_APP_SECRET
      
      @user.get_user_from_cookies cookies["fbsr_#{FB_APP_ID}"]

      return true
    else
      return false
    end
  end
end
