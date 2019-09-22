<template>
<div>
  <comment-box :id="this.$route.params.id"></comment-box>
</div>
</template>

<script>
  import CommentBox from '../common/comment-box.vue';
  export default {
    name: 'GoodsComment',
    components: {
      CommentBox
    }
  }
</script>

<style scoped>

</style>
