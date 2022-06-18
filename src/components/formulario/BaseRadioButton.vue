<template>
  <div class="container formulario">
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          :checked="modelValue === value"
          @change="$emit('update:modelValue', value)"
          v-bind="$attrs"
        />
        <label class="form-check-label" for="flexCheckDefault" v-if="label">
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
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>
