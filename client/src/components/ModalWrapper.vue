<template>
    <button v-if="showButton" type="button" :class="`btn btn-dark`" data-bs-toggle="modal" :data-bs-target="`#${id}`">
        <slot name="button">

        </slot>
    </button>

    <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <slot name="header">
                
            </slot>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-dark">
            <slot name="body">

            </slot>
        </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
    props: {id: {type: String, required: true}, showButton: {type: Boolean, default: true}},
setup() {
  return {
  };
},
};
</script>


<style>
</style>