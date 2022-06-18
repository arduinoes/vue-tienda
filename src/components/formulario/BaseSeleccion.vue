<template>
  <div class="container">
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <select
        class="form-select"
        :value="modelValue"
        v-bind="{
          ...$attrs,
          onChange: ($event) => {
            $emit('update:modelValue', $event.target.value);
          },
        }"
      >
        <option
          v-for="opcion in opciones"
          :value="opcion"
          :key="opcion"
          :selected="opcion === modelValue"
        >
          {{ opcion }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  opciones: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>
