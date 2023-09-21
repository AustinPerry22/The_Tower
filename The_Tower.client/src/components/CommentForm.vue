<template>
    <form @submit.prevent="createComment" class="col-10 form-border">
        <h6>Talk about your stuff here</h6>
        <textarea name="body" placeholder="comment here" maxlength="100"></textarea>
        <button type="submit" class="btn btn-success">Post Comment</button>
    </form>
</template>

<script>
export default {
    props: {eventId: {type: String, required: true}},
setup(props) {
  return {
    async createComment(){

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
</style>