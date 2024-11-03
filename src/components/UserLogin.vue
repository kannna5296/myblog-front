<template>
  <div>
    <div class="text-h4">
      Login
    </div>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="email"
              label="Email"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              required
            />
          </v-col>
        </v-row>
        <v-btn
          class="mt-2"
          color="primary"
          type="submit"
          block
          @click="login"
        >
          Login
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthRepository } from '@/repositories/generated/services/AuthRepository';

const email = ref('admin@example.com');
const password = ref('pass123');
const router = useRouter();

const login = async () => {
  try {
    const loginResponse = await AuthRepository.login({
      requestBody: {
        email: email.value,
        password: password.value,
      },
    });
    localStorage.setItem('token', loginResponse.jwt);
    router.push('/post');
  } catch (error) {
    console.error('Failed to login', error);
  }
};
</script>
