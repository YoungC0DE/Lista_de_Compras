<template>
  <button :type="Type" :name="Name" v-if="Type == 'button' || Type == 'submit'">
    {{ Value }}
  </button>
  <div v-else-if="Type == 'number'">
    <input
      :type="Type"
      :name="Name"
      :min="Min"
      :max="Max"
      :required="Required"
      @input="updateValue"
      @change="updateValue"
    />
    <span>{{ Placeholder }}</span>
  </div>
  <div v-else-if="Type == 'radio'">
    <input
      :type="Type"
      :name="Name"
      :value="Value"
      :required="Required"
      @input="updateValue"
      @change="updateValue"
    />
    <span>{{ Placeholder }}</span>
  </div>
  <div v-else-if="Type == 'password'">
    <input
      :type="Type"
      :name="Name"
      :required="Required"
      @input="updateValue"
      @change="updateValue"
    />
    <span>{{ Placeholder }}</span>
  </div>
  <div v-else>
    <input
      :type="Type"
      :name="Name"
      :required="Required"
      @input="updateValue"
      @change="updateValue"
    />
    <span>{{ Placeholder }}</span>
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    Type: String,
    Name: String,
    Placeholder: String,
    Value: String,
    Min: Number,
    Max: Number,
    Required: Boolean,
    ModelValue: [String, Number],
  },
  methods: {
    updateValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
@import "@/assets/input.css";
</style>
