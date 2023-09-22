<template>
    <div class="container-fluid">
        <form @submit.prevent="editOrCreate">
            <label for="title">Title:</label>
            <input v-model="eventData.name" type="text" name="title" class="form-control" maxlength="25" :required="!editing">
            <label for="description">Description:</label>
            <input v-model="eventData.description" type="text" name="description" class="form-control" maxlength="1000" :required="!editing">
            <label for="coverImg">Cover Image Url:</label>
            <input v-model="eventData.coverImg" type="url" name="coverImg" class="form-control" maxlength="1000">
            <label for="location">Location:</label>
            <input v-model="eventData.location" type="text" name="location" class="form-control" maxlength="100">
            <label for="capacity">Capacity:</label>
            <input v-model="eventData.capacity" type="number" name="capacity" class="form-control" max="999999999">
            <label for="startDate">Date:</label>
            <input v-model="eventData.startDate" type="date" name="startDate" class="form-control" :required="!editing">
            <label for="type">type:</label>
            <select v-model="eventData.type" class="form-control" :required="!editing">
                <option value="concert">concert</option>
                <option value="convention">convention</option>
                <option value="sport">sport</option>
                <option value="digital">digital</option>
            </select>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { Modal } from 'bootstrap';
import { router } from '../router';

export default {
    props:{editing: {type:Boolean, required: true}, activeEvent: {type:Object}},
setup(props) {
    const eventData = ref({})
  return {
    eventData,

    editOrCreate(){
        if(props.editing) {
            this.editEvent()
        }else{
            this.createEvent()
        }
        

    },
    async createEvent(){
        try {
            const newEvent = await eventsService.createEvent(eventData.value)
            Pop.success('New Event Created')
            Modal.getOrCreateInstance('#create-Event').hide()
            eventData.value = {}
            router.push({name: 'EventDetails', params: {eventId: newEvent.id}})
        } catch (error) {
            Pop.error(error)
        }
    },
    async editEvent(){
        try {
            const editedEvent = await eventsService.editEvent(props.activeEvent.id, eventData.value)
            Pop.success('Edited Event')
            Modal.getOrCreateInstance('#edit-Event').hide()
            eventData.value = {}
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style lang="scss" scoped>
</style>