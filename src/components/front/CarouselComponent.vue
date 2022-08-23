<template lang="">
  <section class="carousel">
    <div class="carousel-container container-auto">
      <h2 class="carousel__title text-center">好評推薦</h2>
      <p class="carousel__caption text-center">來聽聽我們服務過的車友、客人怎麼說</p>
      <div id="carouselExampleControls" class="container carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators mb-0">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row carousel__item__group">
              <div class="col-11 col-md-9 col-lg-7 col-xl-5 mb-3 mb-xl-0">
                <div class="row carousel__item__container py-4 px-4 rounded-pill">
                  <div class="col-4">
                    <img class="item__img" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user">
                  </div>
                  <div class="col-8 col-md-7 item__content">
                    <p class="item__caption fs-5">很棒的保養服務，再也不擔心半路車子出狀況。<span></span></p>
                    <p class="item__name fs-6">前端工程師 Musk</p>
                  </div>
                </div>
              </div>
              <div class="col-11 col-md-9 col-lg-7 col-xl-5">
                <div class="row carousel__item__container py-4 px-4 rounded-pill">
                  <div class="col-4">
                    <img class="item__img" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80" alt="user">
                  </div>
                  <div class="col-8 col-md-7 item__content">
                    <p class="item__caption fs-5">技師組車的細心程度讓我很放心。</p>
                    <p class="item__name fs-6">企業主管 Stark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row carousel__item__group">
              <div class="col-11 col-md-9 col-lg-7 col-xl-5 mb-3 mb-xl-0">
                <div class="row carousel__item__container py-4 px-4 rounded-pill">
                  <div class="col-4">
                    <img class="item__img" src="https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&w=1000&q=80" alt="user">
                  </div>
                  <div class="col-8 col-md-7 item__content">
                    <p class="item__caption fs-5">有了預約功能，就不怕常常約不到我有空的時段。</p>
                    <p class="item__name fs-6">業餘車手 Mark</p>
                  </div>
                </div>
              </div>
              <div class="col-11 col-md-9 col-lg-7 col-xl-5">
                <div class="row carousel__item__container py-4 px-4 rounded-pill">
                  <div class="col-4">
                    <img class="item__img" src="http://thenewcode.com/assets/images/thumbnails/sarah-parmenter.jpeg" alt="user">
                  </div>
                  <div class="col-8 col-md-7 item__content">
                    <p class="item__caption fs-5">店裡每週都有約騎活動，不怕沒人陪我一起練車。</p>
                    <p class="item__name fs-6">網紅 Kate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style lang=""></style>
