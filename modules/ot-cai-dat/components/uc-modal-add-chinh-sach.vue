<template>
  <uc-form-modal
    v-model:isOpen="isOpen"
    ref="modalRef"
    title="Thêm chính sách"
    :formData="form"
    :rules="rules"
    :width="500"
    @onSubmit="onFinish()"
    :isSubmit="isLoading"
    @onClose="handleCancel()"
  >
    <a-row :gutter="[10]">
      <a-col :span="24">
        <a-form-item label="Mã chính sách" name="MaChinhSach_LamThem">
          <a-input v-model:value="form.MaChinhSach_LamThem" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="Tên chính sách" name="TenChinhSach_LamThem">
          <a-input v-model:value="form.TenChinhSach_LamThem" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="Nhóm chính sách" name="NhomChinhSach_LamThem_Id">
          <a-select v-model:value="form.NhomChinhSach_LamThem_Id">
            <a-select-option
              v-for="item in dsnhomchinhsach"
              :value="item.NhomChinhSach_LamThem_Id"
              >{{ item.TenNhomChinhSach_LamThem }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="Mã hệ số" name="MaHeSo">
          <a-input v-model:value="form.MaHeSo" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="Hệ số" name="HeSo">
          <a-input-number
            v-model:value="form.HeSo"
            :step="0.01"
            class="w-100"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="Mô tả" name="MoTa">
          <a-input v-model:value="form.MoTa" />
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Tạm khóa" name="Is_TamKhoa">
          <a-select v-model:value="form.Is_TamKhoa">
            <a-select-option :value="0"> Không </a-select-option>
            <a-select-option :value="1"> Có </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </uc-form-modal>
</template>
<script>
export default {
  emits: ["onFinish"],
  props: ["isOpen", "dsnhomchinhsach"],
  data() {
    return {
      isLoading: false,
      form: {
        NhomChinhSach_LamThem_Id: null,
        TenChinhSach_LamThem: "",
        MaChinhSach_LamThem: "",
        HeSo: null,
        MaHeSo: "",
        MoTa: "",
        Is_TamKhoa: 0,
      },
      rules: {
        TenChinhSach_LamThem: [
          {
            required: true,
            message: "Vui lòng nhập tên chính sách",
            trigger: "change",
          },
        ],
        MaChinhSach_LamThem: [
          {
            required: true,
            message: "Vui lòng nhập mã chính sách",
            trigger: "change",
          },
        ],
        NhomChinhSach_LamThem_Id: [
          {
            required: true,
            message: "Vui lòng chọn nhóm chính sách",
            trigger: "change",
          },
        ],
        HeSo: [
          {
            required: true,
            message: "Vui lòng nhập hệ số tăng ca",
            trigger: "change",
          },
        ],
        MaHeSo: [
          {
            required: true,
            message: "Vui lòng nhập mã hệ số tăng ca",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    handleCancel() {
      const $this = this;
      $this.$emit("update:isOpen", false);
    },
    async onFinish() {
      const $this = this;
      $this.isLoading = true;
      let params = { ...$this.form };
      const res = await chinhSachService.ChinhSach_LamThem_Insert(params);
      if (res) {
        $this.handleCancel();
        $this.$emit("onFinish");
        $this.$message.success("Thêm chính sách thành công!");
        $this.$refs.modalRef.$refs.formRef.resetFields();
      }
      $this.isLoading = false;
    },
  },
};
</script>
