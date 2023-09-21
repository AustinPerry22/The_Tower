<template>
    <section class="row bg-primary-subtle text-dark rounded-3 elevation-5">
        <div class="col-3">
            <img :src="comment.creator.picture" alt="comment.creator.name">
            <h6>{{ comment.creator.name }}</h6>
        </div>
        <div class="col-9">
            <p class="py-3">{{ comment.body }}</p>
        </div>
        <div v-if="isMyComment" class="col-12 text-end">
            <button @click="deleteComment" class="btn btn-danger">delete</button>
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { Comment } from '../models/Comment';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';

export default {
    props: {comment:{type: Comment, required: true}},
setup(props) {
  return {
    isMyComment: computed(()=>{
        if(AppState.account.id == props.comment.creatorId) return true
        return false
  }),

  async deleteComment(){
    try {
        await commentsService.deleteComment(props.comment.id)
        Pop.success('Comment Deleted!')
    } catch (error) {
        Pop.error(error)
    }
  }
  };
},
};
</script>


<style lang="scss" scoped>
img{
    height: 7.5vh;
  border-radius: 5rem;
}
</style>