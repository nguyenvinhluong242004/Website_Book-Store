<template>
  <div class="admin-user-body">
    <div class="admin-user-box">
      <div class="admin-user-box-title fs-4 fw-bold text-primary mb-3">
        TÀI KHOẢN
      </div>
      <table class="table mx-auto" style="width: 90%">
        <thead class="border-bottom-0">
          <tr>
            <th
              scope="col"
              class="text-bg-primary rounded-start-4 ps-4"
              style="width: 300px"
            >
              Email
            </th>
            <th scope="col" class="text-bg-primary">Tên</th>
            <th scope="col" class="text-bg-primary">Role</th>
            <th
              scope="col"
              class="text-bg-primary rounded-end-4 text-center"
              style="width: 200px"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ps-4">tranloc@gmail.com</td>
            <td>Trần Thiên Lộc</td>
            <td>admin</td>
            <td class="fs-5 text-center">
              <i class="fa-solid fa-address-card text-primary me-4"></i>
              <i class="fa-solid fa-address-card text-primary"></i>
            </td>
          </tr>
          <tr>
            <td class="ps-4">pahdsn@gmail.com</td>
            <td>Không ai biết</td>
            <td>user</td>
            <td class="fs-5 text-center">
              <i class="fa-solid fa-address-card text-primary me-4"></i>
              <i class="fa-solid fa-address-card text-primary"></i>
            </td>
          </tr>
          <tr>
            <td class="ps-4">mdlkasmdas@gmail.com</td>
            <td>Larry the Bird</td>
            <td>user</td>
            <td class="fs-5 text-center">
              <i class="fa-solid fa-address-card text-primary me-4"></i>
              <i class="fa-solid fa-address-card text-primary"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "../css-component/admin-user.css";

export default {
  name: "AdminUser",
  data() {
    return {};
  },
};
</script>