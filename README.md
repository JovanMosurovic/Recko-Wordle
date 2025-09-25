# Rečko (Serbian Wordle)

This project is a **web-based word guessing game** implemented using **HTML**, **CSS**, and **JavaScript**. It's a Serbian version of the popular Wordle game, where players attempt to guess a secret 5-letter word within 6 attempts. The game features bilingual support (Serbian and English) and includes comprehensive statistics tracking.

> This project was developed as a laboratory assignment for the "Web Design" course at the University of Belgrade School of Electrical Engineering. Please refer to the [instructions.pdf](instructions.pdf) file for detailed assignment requirements.

## Features

### Game Mechanics
- **Word Guessing**: Players have 6 attempts to guess a 5-letter word
- **Color-coded Feedback**: 
  - Green: Letter is in the correct position
  - Yellow: Letter exists in the word but in wrong position
  - Gray: Letter is not in the word
- **Input Validation**: Only valid dictionary words are accepted
- **Keyboard Integration**: Supports both physical and on-screen keyboards

### Bilingual Support
- **Serbian (Cyrillic)**: Default language with Serbian word dictionary
- **English**: Complete English translation with Latin alphabet support and English dictionary

| Serbian | English |
|-------------------|-------------------|
| <img width="680" alt="image" src="https://github.com/user-attachments/assets/7b58040a-8060-426d-9a37-26645eae2238" /> | <img width="628" alt="image" src="https://github.com/user-attachments/assets/67b7d01a-7e8c-47bf-be4b-1cc64902d22d" /> |

> [!NOTE]
> The game uses a limited dictionary for demonstration purposes. 
> <p> Available words include: </p>
> 
> **Serbian**: БАШТА, ВАТРА, МАЈКА, ОБЛАК, СВЕЋА, ЦВЕЋЕ, ТАЊИР, МЛЕКО, ПЕСМА, ЛОПТА, КЊИГА, ЈЕЛКА, СУНЦЕ, МЕСЕЦ, ШКОЛА, СЕСТИ, СТИЋИ, УЧИТИ, ПАСТИ, ПТИЦА
> 
> **English**: HOUSE, WATER, LIGHT, WORLD, GREAT, SMALL, RIGHT, PLACE, NIGHT, POINT, SOUND, WRITE, SPELL, HEART, PLANT, STUDY, LEARN, STORY, EARLY, CLEAR

### Statistics & Progress Tracking
- **Game Statistics**: Tracks total games, win percentage, current streak, and max streak
- **Guess Distribution**: Visual chart showing how many attempts it typically takes to solve
- **Local Storage**: Statistics persist between browser sessions

<div align="center">
<img width="400" alt="image" src="https://github.com/user-attachments/assets/0453cbb7-d7ba-410c-a605-dec4174cc619" />
</div>

### Help & Instructions
- **Interactive Tutorial**: Comprehensive help system with visual examples
- **Color-coded Examples**: Shows how the feedback system works
- **Game Rules**: Clear explanation of objectives and mechanics

## Game Rules

1. **Objective**: Guess the secret 5-letter word in maximum 6 attempts
2. **Input**: Type a 5-letter word and press `ENTER` to submit ( deleting letters with `Backspace` is possible before clicking `ENTER` )
3. **Feedback**: Letters are colored based on their correctness:
   - **Green**: Correct letter in correct position
   - **Yellow**: Correct letter in wrong position  
   - **Gray**: Letter not in the word
4. **Victory**: Guess the word within 6 attempts
5. **Dictionary**: Only valid words from the built-in dictionary are accepted

<div align="center">
<img width="400" alt="image" src="https://github.com/user-attachments/assets/09745927-e3a3-4f49-acb0-e07670cd233f" />
</div>

## Installation & Usage

1. Download all project files
2. Open `index.html` in a web browser
3. No additional setup or dependencies required
4. Game runs entirely client-side

## Assignment Reference

Course: **Web Design ([13S112VD](https://www.etf.bg.ac.rs/en/fis/karton_predmeta/13S112VD-2013))**  
Academic Year: **2024/2025**  
University of Belgrade, School of Electrical Engineering  
