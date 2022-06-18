<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <input
        type="date"
        class="form-control"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
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
    type: [Date, String, Number],
    default: "",
  },
});
</script>
