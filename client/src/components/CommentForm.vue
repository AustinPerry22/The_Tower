<template>
    <form @submit.prevent="createComment" class="col-10 form-border">
        <h6>Talk about your stuff here</h6>
        <textarea v-model="formData.body" name="body" placeholder="comment here" maxlength="1000" rows="5"></textarea>
        <button type="submit" class="btn btn-success">Post Comment</button>
    </form>
</template>

<script>
import Pop from '../utils/Pop';
import {commentsService} from '../services/CommentsService'
import { ref } from 'vue';
import { AppState } from '../AppState';
export default {
    props: {eventId: {type: String || undefined, required: true}},
setup(props) {
    const formData = ref({})
  return {
    formData,
    async createComment(){
        try {
            formData.value.eventId = AppState.activeEvent.id
            // TODO isAttending bool change here
            await commentsService.createComment(formData.value)
            formData.value = {}
            Pop.success('Created Comment')
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style lang="scss" scoped>
.form-border{
    border-style: dashed;
    border-color: rgb(18, 20, 88);
    border-width: .75em;
}
textarea{
    width: 100%;
    height: 15vh;
}

</style>