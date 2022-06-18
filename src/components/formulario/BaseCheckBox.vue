<template>
  <div class="container formulario">
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <label 
          class="form-check-label" for="flexCheckDefault"
          v-if="label"
          >
          {{ label }}
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  })
</script>
