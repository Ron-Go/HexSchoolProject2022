<template lang="">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-3"
        id="card01"
        @mouseup="flipCard('#card01', 0)">
        <div v-if="flip[0].isReverse" class="card border-0 shadow my-3">
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/18/1c/30/b4/photo1jpg.jpg"
            class="card-img-top p-3 pb-0" alt="..." />
          <div class="card-body card-rotate-on-turn">
            <h5 class="card-title card-rotate">反面</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div v-else class="card border-0 shadow my-3 ">
          <img src="https://amp.dev/static/inline-examples/images/sea.jpg" class="card-img-top p-3 pb-0" alt="..." />
          <div class="card-body">
            <h5 class="card-title">正面</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3"
        id="card02"
        @mouseup="flipCard('#card02',1)">
        <div v-if="flip[1].isReverse" class="card card-rotate-reverse border-0 shadow my-3">
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/18/1c/30/b4/photo1jpg.jpg"
            class="card-img-top p-3 pb-0" alt="..." />
          <div class="card-body card-rotate-on-turn">
            <h5 class="card-title card-rotate">反面</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div v-else class="card card-rotate-front border-0 shadow my-3 ">
          <img src="https://amp.dev/static/inline-examples/images/sea.jpg" class="card-img-top p-3 pb-0" alt="..." />
          <div class="card-body">
            <h5 class="card-title">正面</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3"
        id="card03"
        @mouseup="flipCard('#card03',2)">
        <div v-if="flip[2].isReverse" class="card card-rotate-reverse border-0 shadow my-3">
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/18/1c/30/b4/photo1jpg.jpg"
            class="card-img-top p-3 pb-0" alt="..." />
          <div class="card-body card-rotate-on-turn">
            <h5 class="card-title card-rotate">反面</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div v-else class="card card-rotate-front border-0 shadow my-3 ">
          <img src="https://amp.dev/static/inline-examples/images/sea.jpg" class="card-img-top p-3 pb-0" alt="..." />
          <div class="card-body">
            <h5 class="card-title">正面</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flip: [
        {
          isRotate: false,
          isReverse: false,
        },
        {
          isRotate: false,
          isReverse: false,
        },
        {
          isRotate: false,
          isReverse: false,
        },
      ],
    };
  },
  mounted() {
    console.log(this.$refs);
  },
  methods: {
    flipCard(id, num) {
      const dom = document.querySelector(id);
      if ((this.flip[num].isRotate === true && this.flip[num].isReverse === true) || (this.flip[num].isRotate === false && this.flip[num].isReverse === false)) {
        this.flip[num].isRotate = !this.flip[num].isRotate;
        if (this.flip[num].isRotate) {
          dom.classList.remove('card-rotate-off');
          dom.classList.add('card-rotate-on');
        } else {
          dom.classList.remove('card-rotate-on');
          dom.classList.add('card-rotate-off');
        }
        setTimeout(() => {
          this.flip[num].isReverse = !this.flip[num].isReverse;
        }, 500);
      }
    },
  },
};
</script>
<style lang="scss">
  .card{
    transition: all 1s ease-in-out;
    cursor: pointer;
    h5{
      transition: all 1s ease-in-out;
    }
  }
  .card-rotate-on{
    transition: all 1s ease-in-out;
    transform: rotateY(180deg);
    &-turn{
      transition: all 1s ease-in-out;
      transform: rotateY(-180deg);
    }
    h5{
      transition: all 1s ease-in-out;
      color: lightskyblue;
    }
  }
  .card-rotate-off{
    transition: all 1s ease-in-out;
    transform: rotateY(0deg);
  }
</style>
