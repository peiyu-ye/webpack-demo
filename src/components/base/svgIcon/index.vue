<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="'fill: '+currentColor+';stroke:'+currentColor+';'"   
  >
    <title>{{tipTitle}}</title>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    currentColor: {
      type: String,
      default: "#fff"
    },
    tipTitle:{
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  cursor: pointer;
}

.nav-icon {
  width: 80%;
  height: 80%;
}

.block-item {
  width: 4.4em;
  height: 4.4em;
  opacity: 0.8;
}

.not-found {
  width: 30rem;
  height: 30rem;
  opacity: 0.8;
}

.blockIcon {
  width: 12.8rem;
  height: 13rem;
}
</style>
