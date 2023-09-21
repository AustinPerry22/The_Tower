<template>
    <section class="row bg-primary-subtle text-dark rounded-3 elevation-5">
        <div class="col-3">
            <img :src="comment.creator.picture" alt="comment.creator.name">
            <h6>{{ comment.creator.name }}</h6>
        </div>
        <div class="col-9">
            <p class="py-3">{{ comment.body }}</p>
        </div>
    </section>
</template>

<script>
import { Comment } from '../models/Comment';

export default {
    props: {comment:{type: Comment, required: true}},
setup() {
  return {};
},
};
</script>


<style lang="scss" scoped>
img{
    height: 7.5vh;
  border-radius: 5rem;
}
</style>