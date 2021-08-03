<template>
  <form-wizard
    title="Minhas preferências de livros"
    subtitle="Escolha o que mais te apetece"
  >
    <tab-content title="Informações pessoais">
      <v-radio-group v-model="estilo">
        <v-radio
          v-for="item in items"
          :key="item"
          :label="item"
          :value="item"
        ></v-radio>
      </v-radio-group>
    </tab-content>
    <tab-content title="Detalhamento">
      <template v-if="estilo === 'Narrativa'">
        Mostrarei um forma de narrativa
      </template>
      <template v-else-if="estilo === 'Poético'">
        Mostrarei um forma de poética
      </template>
      <template v-else> Mostrarei um forma de dramático </template>
    </tab-content>
    <tab-content title="Last step">
      Yuhuuu! This seems pretty damn simple
    </tab-content>
  </form-wizard>
</template>

<script>
export default {
  data() {
    return {
      items: ["Narrativa", "Poético", "Dramático"],
      estilo: "",
    };
  },
};
</script>

<style>
</style>