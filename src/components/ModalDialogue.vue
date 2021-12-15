<!--
<template>
  <button type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteItem"
          @click="itemForRemove = item">
    Delete item
  </button>

  <ModalDialogue  title='Modal title here'
                  body='Message in modal body'
                  :itemName='someItem.name'
                  acceptButton='Save'
                  acceptButtonClass='btn-danger'
                  @accept-event="deleteItem(itemForRemove.id)"
                  @cancel-event="itemForRemove = {}"
                  id='deleteItem'>
  </ModalDialogue>
</template

<script>
export default {
  data() {
    return {
      itemForRemove: {},
    };
  },
}
</script>
-->

<template>
  <div class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ this.title }}
          </h5>
        </div>
        <div class="modal-body">
          <p>{{ this.body }}:</p>
          <p><b>{{ this.itemName }}</b></p>
        </div>
        <div class="modal-footer">
          <button @click="this.$emit('cancelEvent')"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
            Cancel
          </button>
          <button @click="this.$emit('acceptEvent')"
                  class="btn"
                  :class='acceptButtonClass'
                  data-bs-dismiss="modal">
            {{ acceptButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Confirm action',
    },
    body: {
      type: String,
      required: false,
      default: 'You sure?',
    },
    itemName: {
      type: String,
      required: false,
      default: 'Item',
    },
    acceptButtonText: {
      type: String,
      required: false,
      default: 'Confirm',
    },
    acceptButtonClass: {
      type: String,
      required: false,
      default: 'btn-success',
    },
  },
};
</script>
