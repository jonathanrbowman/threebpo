<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="character_class in classes"
            :key="character_class.name"
            @change="getClassDetails(character_class.url)"
          >
            <v-expansion-panel-header>
              {{ character_class.name }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <h5>Starting Equipment</h5>
              <v-list>
                <v-list-item
                  v-for="(equip, i) in details.starting_equipment"
                  :key="i"
                >
                  <v-btn
                    color="primary"
                    rounded
                    @click="getEquipDetails(equip.equipment.url)"
                  >
                    {{ equip.equipment.name }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>

      <v-dialog
        v-model="detailsOpen"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <v-card>
          <v-card-title>
            Equip Details
          </v-card-title>

          <v-card-text v-if="equipDetails">
            <h5 class="text-subtitle-1">Name: {{ equipDetails.name }}</h5>

            <!-- Only show this stuff if equip category is armor -->
            <template v-if="equipDetails.equipment_category.name == 'Armor'">
              <h5 class="text-subtitle-1">
                Armor Class: {{ equipDetails.armor_category }}
              </h5>
              <h5 class="text-subtitle-1">
                Base AC: {{ equipDetails.armor_class.base }}
              </h5>
            </template>

            <!-- Only show this stuff if equip category is weapon -->
            <template v-if="equipDetails.equipment_category.name == 'Weapon'">
              <h5 class="text-subtitle-1">
                Weapon Type: {{ equipDetails.weapon_category }}
              </h5>
              <h5 class="text-subtitle-1">
                Damage: {{ equipDetails.damage.damage_dice }}
                {{ equipDetails.damage.damage_type.name }}
              </h5>
              <h5 class="text-subtitle-1">
                Range: {{ equipDetails.weapon_range }}
              </h5>
            </template>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      classes: [],
      details: {},
      equipDetails: null,
      detailsOpen: false
    };
  },

  mounted() {
    axios.get("https://www.dnd5eapi.co/api/classes").then(response => {
      this.classes = response.data.results;
    });
  },

  methods: {
    getClassDetails(url) {
      axios.get("https://www.dnd5eapi.co" + url).then(response => {
        this.details = response.data;
      });
    },

    getEquipDetails(url) {
      axios.get("https://www.dnd5eapi.co" + url).then(response => {
        this.detailsOpen = true;
        this.equipDetails = response.data;
      });
    }
  }
};
</script>

<style>
.v-application--wrap {
  background-color: #f1f1f1;
}
</style>
