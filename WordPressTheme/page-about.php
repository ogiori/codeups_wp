<?php get_header(); ?>

<!-- トップ画像 -->
<?php get_template_part('template/page-head'); ?>

<!-- ぱんくず -->
<?php get_template_part('template/breadcrumb'); ?>

<!-- アバウトコンテンツ -->
<section class="about-contents-space about-contents">
  <div class="about-contents__inner inner inner-icon">
    <div class="about-contents__wrap">
      <div class="about-contents__img1">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/about_img1.jpg" alt="">
      </div>
      <div class="about-contents__img2">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/common/about_img2.jpg" alt="">
      </div>
    </div>
    <div class="about-contents__block">
      <h2 class="about-contents__title">Dive into<br>
        the Ocean</h2>
      <?php if (SCF::get('about_text')) : ?>
        <p class="about-contents__text"><?php echo SCF::get('about_text'); ?></p>
      <?php endif; ?>

    </div>
  </div>
</section>

<!-- フォトギャラリー -->
<section class="about-gallery-space about-gallery">
  <div class="about-gallery__inner inner inner-icon-right">

    <div class="about-gallery__title">
      <div class="title">
        <p class="title__en">gallery</p>
        <h2 class="title__jp">フォト</h2>
      </div>
    </div>
    <div class="about-gallery__contents">
      <div class="gallery">
        <div class="gallery__modal js-gallery"></div>
        <ul class="gallery__list">

          <?php
          $gallerys = SCF::get('gallerys');
          foreach ($gallerys as $gallery) :

            $img_data = wp_get_attachment_url($gallery['about_gallery']); // 画像のURLを取得
            $alt = get_post_meta($gallery['about_gallery'], '_wp_attachment_image_alt', true) ?: get_post($gallery['about_gallery'])->post_title;
          ?>

            <li class="gallery__item js-gallery">
              <img src="<?php echo $img_data; ?>" alt="<?php echo $alt; ?>">
            </li>

          <?php endforeach; ?>

        </ul>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>