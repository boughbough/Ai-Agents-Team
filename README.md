<div align="center">

  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Light%20Skin%20Tone.png" alt="Tech" width="70" />
  <h1>O R C H E S T R A T I O N</h1>
  <h2>Multi-agents IA pour le développement logiciel et scientifique</h2>

  <p><b>Un framework d'agents IA spécialisés qui code, audite et prouve des théorèmes.
    <br />Autonome . Modulaire . Réutilisable .</b></p>

  <p>
    <a href="#"><img src="https://img.shields.io/badge/Statut-Terminé-2EA043?style=for-the-badge" alt="Statut" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Framework-OpenClaude_v0.17.1-FF6B35?style=for-the-badge" alt="OpenClaude" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Agents-7_spécialisés-2196F3?style=for-the-badge" alt="Agents" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/Licence-MIT-1A1A1A?style=for-the-badge&logo=github&logoColor=white" alt="License" /></a>
  </p>

  <br />

  <p><i>Propulsé par OpenClaude + OpenRouter</i></p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  </p>

  <hr />
</div>

<br />

> **Orchestration multi-agents IA** est un framework de développement automatisé reposant sur une équipe de **7 agents IA spécialisés**, orchestrés via **OpenClaude** et **OpenRouter**. Chaque agent a un rôle strict défini par un System Prompt — ensemble ils conçoivent, développent, auditent et valident des projets complexes de manière autonome. Deux cas d'application valident l'architecture : une plateforme web full-stack (**FlightReserva**) et une preuve expérimentale en théorie des graphes (**Conjecture 7**).

---

## ✲ L'équipe d'agents IA

### Projet FlightReserva (6 agents)

| Agent | Rôle | Périmètre strict |
| :--- | :--- | :--- |
| `html-architect` | Structure HTML | HTML5 sémantique, ARIA, BEM — jamais de CSS ni JS |
| `css-stylist` | Design system | CSS pur, variables, responsive — jamais de HTML ni JS |
| `animation-specialist` | Animations | @keyframes, transitions CSS — jamais de JS |
| `js-integrator` | Logique métier | JavaScript ES6+ vanilla — jamais de styles inline |
| `java-backend` | Backend REST | Java 17+, Spring Boot — jamais de frontend |
| `qa-reviewer` | Audit qualité | Révision transversale — 24/24 critères PASS |

### Projet Conjecture 7 (2 agents)

| Agent | Rôle | Périmètre strict |
| :--- | :--- | :--- |
| `mathematicien` | Algorithmique | Python, NetworkX, brute-force domination |
| `qa-reviewer` | Audit scientifique | Même agent que FlightReserva — réutilisabilité démontrée |

> **Principe clé** : les agents travaillent **séquentiellement** pour éviter les conflits de fichiers. Chaque System Prompt est défini dans `.openclaude/agents/`.

---

## ✲ Cas d'application 1 — FlightReserva

Plateforme web de réservation de vols **100% client-side** :

- 🛫 **500 vols** simulés, 40 routes internationales, 20 compagnies, 10 ans (2026–2036)
- 🔍 **Plein de filtres** : origine, destination, compagnie, classe, dates, prix, durée, places
- 📋 **Formulaire de réservation** complet (passager, bagages, repas)
- 📧 **Email de confirmation** automatique via EmailJS
- 🎨 Hero animé, typewriter CSS, compteurs IntersectionObserver, carousel

```
Audit QA final : 24/24 PASS — 0 erreur critique
```

---

## ✲ Cas d'application 2 — Conjecture 7

Vérification expérimentale de la conjecture de Dickson Y.B. Annor :

> Pour tout graphe connecté sans isolés G :
> **γt(G) ≥ ⌈(3γ(G) + 2γc(G)) / 6⌉**

- 200 graphes aléatoires connectés testés (n ∈ [5, 12])
- Calcul exact par brute-force des 3 paramètres de domination
- Rapport HTML interactif généré (Chart.js, dark theme)

```
Résultat : 200/200 HOLDS — 0 violation détectée
```

---

## ✲ Architecture du projet

```
claw-code/
├── .openclaude/agents/      ← System Prompts des 7 agents
├── .claude/agent-memory/    ← Mémoire persistante inter-sessions
├── siteweb/                 ← FlightReserva (HTML/CSS/JS/Java)
│   ├── css/styles.css       ← Design system (30 sections)
│   ├── js/FlightData.js     ← 500 vols générés via Python
│   ├── js/flightsTable.js   ← Filtres, tri, pagination
│   └── js/bookingUI.js      ← Réservation + EmailJS
└── conjecture/              ← Conjecture 7 (Python/HTML/CSV)
    ├── test_inequality.py   ← Algorithme brute-force
    ├── results.csv          ← 200 résultats
    └── conjecture_report.html ← Rapport interactif
```

---

## ✲ Lancement

### FlightReserva
```bash
cd siteweb
python -m http.server 8080
# → http://localhost:8080
```

### Conjecture 7
```bash
pip install networkx
python conjecture/test_inequality.py
```

### OpenClaude

**1. Télécharger le code source**
```bash
# Télécharger le ZIP depuis :
# https://github.com/Gitlawb/openclaude
# puis décompresser dans un dossier permanent
```

**2. Installer les dépendances**
```bash
# Node.js : https://nodejs.org/en/download
# Bun     : https://bun.com/docs/installation
```

**3. Autoriser l'exécution (PowerShell Windows)**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**4. Compiler et lier OpenClaude** (dans le dossier source)
```bash
npm install
npm run build
npm link
```

**5. Lancer dans votre dossier de projet**
```bash
openclaude

# Sans interruptions (désactive les confirmations) :
openclaude --dangerously-skip-permissions
```

**6. Configurer OpenRouter** (une seule fois)
```
/provider → Add provider → OpenAI
  Étape 2/7 : https://openrouter.ai/api/v1
  Étape 3/7 : openai/gpt-oss-120b:free  (ou tout modèle gratuit sur openrouter.ai)
  Étape 6/7 : votre clé API OpenRouter
  → Done
```

**7. Créer un agent**
```
/agents → Create new agent
  Emplacement : Project (.openclaude/agents/)  ← recommandé
  Méthode     : Manual configuration
  Identifiant : nom-agent  (ex: html-architect)
  System Prompt, outils, modèle, mémoire → Done
```

---

## ✲ Stack technique

| Secteur | Technologie |
| :--- | :--- |
| **Orchestration IA** | [OpenClaude v0.17.1](https://github.com/Gitlawb/openclaude) |
| **Modèle LLM** | `openai/gpt-oss-120b:free` via [OpenRouter](https://openrouter.ai) |
| **Frontend** | HTML5 / CSS3 / JavaScript Vanilla (ES6+) |
| **Backend (conceptuel)** | Java 17 + Spring Boot |
| **Calcul scientifique** | Python + NetworkX |
| **Emails** | [EmailJS](https://www.emailjs.com/) |
| **Rapport interactif** | Chart.js |

---

## ✲ Auteur

<div align="center">

| Mohamed Boughmadi |
| :---: |
| [![GitHub](https://img.shields.io/badge/GitHub-boughbough-181717?style=for-the-badge&logo=github)](https://github.com/boughbough) |

*Projet tuteuré — Licence MIAGE 3ème année — Université Paris Nanterre*  
*Encadrant : François Delbot*

</div>

---

## ✲ Licence

Ce projet est sous licence MIT.

---
