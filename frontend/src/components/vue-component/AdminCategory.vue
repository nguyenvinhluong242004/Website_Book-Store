<template>
  <div class="admin-category-body">
    <div class="admin-category-box">
      <div class="admin-category-box-title fs-4 fw-bold text-primary mb-3">
        DANH MỤC
      </div>
      <table class="table mx-auto" style="width: 70%">
        <thead class="border-bottom-0">
          <tr>
            <th scope="col" class="text-bg-primary rounded-start-4 text-center" style="width: 100px;">#</th>
            <th scope="col" class="text-bg-primary ps-4">Tên</th>
            <th scope="col" class="text-bg-primary rounded-end-4 text-center" style="width: 250px">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">1</td>
            <td class="ps-4">Thiếu nhi</td>
            <td class="fs-5 text-center">
              <i class="fa-solid fa-pen-to-square text-warning me-4"></i>
              <i class="fa-solid fa-trash-can text-danger"></i>
            </td>
          </tr>
          <tr>
            <td class="text-center">2</td>
            <td class="ps-4">Giáo dục</td>
            <td class="fs-5 text-center">
              <i class="fa-solid fa-pen-to-square text-warning me-4"></i>
              <i class="fa-solid fa-trash-can text-danger"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "../css-component/admin-category.css";

export default {
  name: "AdminCategory",
  data() {
    return {};
  },
};
</script>