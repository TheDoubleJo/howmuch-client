<script setup>

import { ref } from 'vue'
import axios from "axios";

var montant = ref(null)

// Informations d'authentification
const username = ref('')
const password = ref('')

// URL de l'API
const apiUrl = 'https://howmuch.duckdns.org/';

// Fonction pour obtenir le token d'authentification
async function getToken() {
    try {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        // Effectuer une requête POST pour obtenir le token
        const response = await axios.post(apiUrl + 'token', {
            grant_type: "password",
            username: username.value,
            password: password.value
        }, { headers: headers });

        // Récupérer le token depuis la réponse
        const token = response.data.access_token;

        // Retourner le token
        return token;
    } catch (error) {
        // En cas d'erreur, afficher l'erreur
        console.error('Une erreur s\'est produite lors de l\'obtention du token:', error.message);
        console.error(error);
        throw error;
    }
}

let CADollar = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'CAD',
});

// Fonction pour effectuer la requête REST avec le token d'authentification
async function makeRequest() {
    try {
        // Obtenir le token
        const token = await getToken();

        // Configuration des en-têtes avec le token d'authentification
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Effectuer la requête GET à l'endpoint spécifié avec les en-têtes d'authentification
        const response = await axios.get(apiUrl + 'left-in-budget', { headers });

        // Afficher la réponse
        console.log('Réponse de l\'API:', response.data);
        return CADollar.format(response.data.balance / 1000)
    } catch (error) {
        // En cas d'erreur, afficher l'erreur
        console.error('Une erreur s\'est produite lors de la requête:', error.message);
    }
}

async function login() {
    montant.value = await makeRequest();
}

</script>

<template>

    <form name="login-form">
        <div class="mb-3">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="username" />
        </div>
        <div class="mb-3">
            <label for="password">Password: </label>
            <input type="password" id="password" v-model="password" />
        </div>
        <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
            Go
        </button>
    </form>
    <h3>Mon argent: {{ montant }}</h3>


</template>