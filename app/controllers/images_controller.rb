class ImagesController < ApplicationController
  include ApplicationHelper
  
  def upload
    @image  = params[:image]
    @image_content = @image.read
    @url_encode_profix='data:image/jpeg;base64,'
    @image_base64 = (@image_content.split @url_encode_profix)[1]

    @imgs = Magick::Image.read_inline @image_base64
    @img = @imgs.first

    if @img.columns > 400 or @img.rows > 400 then
      # @img = @img.resize_to_fill(400, 400);
      @img = @img.change_geometry('400x400>') { |cols, rows, imgage|
        imgage.resize!(cols, rows)
       }
    end
    
    $redis.set user_fb_id.to_s, Marshal.dump(@img)
        
    @img_org = @img.clone
    
    @img = do_something_with_image @img

    
    @img_width = @img.rows
    @img_height = @img.columns
    
    @img = @url_encode_profix + Base64.encode64(@img.to_blob)
    @img_org = @url_encode_profix + Base64.encode64(@img_org.to_blob)
    
    render :layout => false
  end
  
  def update_image
    @url_encode_profix='data:image/jpeg;base64,'
    
    @img = Marshal.load($redis.get user_fb_id.to_s)
 
    @img = do_something_with_image(@img, params[:first_slider].to_i)

    @img = @url_encode_profix + Base64.encode64(@img.to_blob)
    
    render :layout => false
  end
  
  private
  def do_something_with_image(img, first = 256)
 
    #img.quantize(first, Magick::GRAYColorspace, Magick::NoDitherMethod) 
    img.segment(Magick::GRAYColorspace, 0.1, 1.5).gaussian_blur(0.0,0.5).quantize(2, Magick::GRAYColorspace, Magick::NoDitherMethod).gaussian_blur(0.0,0.5)
  end
end
