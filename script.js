
// Feature cards (dashboard buttons)
const featureCards = document.querySelectorAll(".feature-card");

// All full-page sections
const fullPages = document.querySelectorAll(".full-page");

// Close buttons inside full pages
const closeButtons = document.querySelectorAll(".close-btn");

// Function: open a tab
function openTab(id) {
    // Close all tabs first
    fullPages.forEach(page => page.classList.remove("active"));

    // Open selected tab
    const targetPage = document.getElementById(id);
    if (targetPage) {
        targetPage.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

// Function: close all tabs
function closeAllTabs() {
    fullPages.forEach(page => page.classList.remove("active"));
    document.body.style.overflow = "auto";
}

// Click on feature card → open tab
featureCards.forEach(card => {
    card.addEventListener("click", () => {
        const targetId = card.dataset.target;
        openTab(targetId);
    });
});

// Click on close button → close tab
closeButtons.forEach(btn => {
    btn.addEventListener("click", closeAllTabs);
});


function todolist() {
    let tasks = [];
    let savedTasks = localStorage.getItem("saveTask");
    let h4 = document.querySelector(".task-card h4")

    if (savedTasks) {
        const parsed = JSON.parse(savedTasks);
        if (Array.isArray(parsed)) {
            tasks = parsed;
        } else {
            tasks = [];

        }
    }
    function rendertask() {
        let todolist = document.querySelector(".todo-list");
        let clutter = "";
        tasks.forEach((alltask, idx) => {
            clutter += `<div class="task-card">
    <h4>${alltask.title}</h4>
    <div class="task-actions">
        <button class="done-btn" id="${idx}">Mark as Done</button>
    </div>
</div>
`;
        })
        todolist.innerHTML = clutter;
    }


    rendertask();

    let input = document.querySelector(".todo-form input");
    let addtask = document.querySelector(".todo-form button");

    addtask.addEventListener("click", () => {
        if (input.value == "") {
            alert("Please enter task");
            return;
        }
        tasks.push({ title: input.value });
        localStorage.setItem("saveTask", JSON.stringify(tasks));
        rendertask();
    })

    let todolist = document.querySelector(".todo-list");

    todolist.addEventListener("click", (e) => {
        if (e.target.classList.contains("done-btn")) {
            let index = e.target.id;
            tasks.splice(index, 1);
            localStorage.setItem("saveTask", JSON.stringify(tasks));
            rendertask();
        }
    });

}
todolist();


function dailyplanner() {
    let storedailytask = localStorage.getItem("storedailytask");
    let a = JSON.parse(storedailytask);
    let clutter = "";
    let dailyTask = {};
    let plannerlist = document.querySelector(".planner-list");
    Array.from({ length: 18 }, (_, idx) => {
        clutter += `<div class="task-card planner-card">
                <h4>${6 + idx}:00 - ${7 + idx}:00</h4>
                <input type="text" id="${idx}" placeholder="Enter task" value="${a?.[idx] || ''}"over>
            </div>`

    });
    plannerlist.innerHTML = clutter;
    let plans = document.querySelectorAll(".planner-card input");
    plans.forEach((e) => {
        e.addEventListener("input", () => {
            dailyTask[e.id] = e.value;
            localStorage.setItem("storedailytask", JSON.stringify(dailyTask));
        })
    })

}
dailyplanner();

async function dailyqutes() {
    const h4 = document.querySelector(".inner-card h4");
    try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        h4.textContent = data.quote;
    } catch {
        h4.textContent = "Stay disciplined. Progress is inevitable.";
    }
}


dailyqutes();
function pomodora() {

    let totalsecond = 25 * 60;
    let h1 = document.querySelector(".pomodoro h1");
    let st = document.querySelector(".pomo-buttons .st")
    let pausee = document.querySelector(".pomo-buttons .pu")
    let resett = document.querySelector(".pomo-buttons .reset")

    function updateTimer() {
        let minust = Math.floor(totalsecond / 60);
        let second = totalsecond % 60;
        h1.innerHTML = `${String(minust).padStart(2, "0")}:${String(second).padStart(2, "0")} `
        if (totalsecond == 0) {
            h1.innerHTML = "Take Break";
            pause();
            setTimeout(() => {
                reset();
            }, 3000);
        }
    }
    updateTimer();
    let timer;

    function starttimer() {
        timer = setInterval(() => {
            totalsecond--;
            updateTimer();
        }, 1000);

    }

    starttimer();

    function pause() {
        clearInterval(timer);
    }
    pause()

    function reset() {
        totalsecond = 25 * 60;
        clearInterval(timer);
        updateTimer();

    }

    reset();
    st.addEventListener("click", starttimer);
    pausee.addEventListener("click", pause);
    resett.addEventListener("click", reset);
}
pomodora();
async function heroSectionWeather() {


    const cityEl = document.querySelector(".hero p");
    const tempEl = document.querySelector(".weather h1");
    const timeEl = document.querySelector(".hero h1");
    const dateEl = document.querySelector(".hero h3");
    const stateEl = document.querySelector(".weather p");
    const humidityEl = document.querySelector(".weather .hum");
    const windEl = document.querySelector(".weather .wind");
    let hero = document.querySelector(".hero");

    const API_KEY = import.meta.env.VITE_WEATHER_TOKEN;
    const CITY = "surat";

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`
    );
    const data = await response.json();

    cityEl.innerHTML = data.name;

    const rawTemp = data.main.temp;
    const temperature = rawTemp > 100 ? rawTemp - 273.15 : rawTemp;
    tempEl.innerHTML = `${Math.round(temperature)}°C`;

    stateEl.innerHTML = data.weather[0].main;
    humidityEl.innerHTML = `Humidity: ${data.main.humidity}%`;
    windEl.innerHTML = `Wind: ${data.wind.speed} km/h`;

    const now = new Date();
    const date = now.getDate();
    const year = now.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = months[now.getMonth()];

    function updateTime() {
        const now = new Date();

        const time = now.toLocaleString("en-IN", {
            weekday: "long",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: false

        });

        if (now.getHours() >= 7 && now.getHours() < 9) {
            hero.style.backgroundImage = "url('./assets/sunrise 7-9.jpg')";
        }
        else if (now.getHours() >= 9 && now.getHours() < 12) {
            hero.style.backgroundImage = "url('./assets/4-7.jpg')";
        }
        else if (now.getHours() >= 12 && now.getHours() < 15) {
            hero.style.backgroundImage = "url('./assets/morning 9-4.jpg')";
        }
        else if (now.getHours() >= 15 && now.getHours() < 20) {
            hero.style.backgroundImage = "url('./assets/7-8.jpg')";
        }
        else {
            hero.style.backgroundImage = "url('./assets/8 to fullnight.jpg')";
        }







        document.querySelector(".hero h1").innerHTML = time;



    }

    updateTime();
    setInterval(updateTime, 1000);


    dateEl.innerHTML = `${date} ${month} ${year}`;
}

heroSectionWeather();


function changethem() {
    const themebtn = document.querySelector(".theme-btn");
    const root = document.documentElement;

    const themes = [
        {
            bg: "#0a1f2b",
            card: "#123344",
            accent: "#4dd0e1",
            text: "#e0f7fa",
            danger: "#ff5252",
            cardtext: "#7fafb6ff"
        },
        {
            bg: "#1b102b",
            card: "#2d1a4a",
            accent: "#9b5de5",
            text: "#f3e8ff",
            danger: "#ff4d6d",
            cardtext: "#9e85b8ff"
        },
        {
            bg: "#0f1f17",
            card: "#1e3a2f",
            accent: "#52b788",
            text: "#e9f5db",
            danger: "#d00000",
            cardtext: "#96b374ff"
        },
        {
            bg: "#0d0d0d",
            card: "#1a1a1a",
            accent: "#00f5d4",
            text: "#f8f9fa",
            danger: "#ff006e",
            cardtext: "#7092b5ff"
        },
        {
            bg: "#f5f5f5",
            card: "#ffffff",
            accent: "#3a86ff",
            text: "#1c1c1c",
            danger: "#e63946",
            cardtext: "#1c1c1c"
        }
    ];

    // 🔹 index localStorage se lo
    let index = Number(localStorage.getItem("themeIndex")) || 0;

    // 🔹 Apply function
    function applyTheme(i) {
        const t = themes[i];
        root.style.setProperty("--bg", t.bg);
        root.style.setProperty("--card", t.card);
        root.style.setProperty("--accent", t.accent);
        root.style.setProperty("--text", t.text);
        root.style.setProperty("--danger", t.danger);
        root.style.setProperty("--cardtext", t.cardtext);
    }

    // 🔹 Page load pe theme apply
    applyTheme(index);

    // 🔹 Button click
    themebtn.addEventListener("click", () => {
        if (index < 4) {
            index++
        }
        else {
            index = 0
        }
        console.log(index);

        applyTheme(index);
        localStorage.setItem("themeIndex", index);
    });
}

changethem();


function dailyplannertask() {
    let Dplanner = document.querySelector(".dpalnner");
    let input = document.querySelector(".addtask input");
    let addtask = document.querySelector(".addtask button");

    let storedailyplan = [];
    let savedd = localStorage.getItem("savetasks");
    JSON.parse(savedd)
    if (savedd) {
        storedailyplan = JSON.parse(savedd);
    }

    function rendertask() {
        let clutter = "";
        storedailyplan.forEach((tasks) => {
            clutter += `<div class="task-card">
            <h4>${tasks.task}</h4>
            <button>Mark as Done</button>
            </div>`
        })
        Dplanner.innerHTML = clutter;
        deletetask();
    }
    rendertask();

    function addtasks() {
        addtask.addEventListener("click", () => {
            if (input.value == "") {
                alert("Please enter task");
                return;
            }
            storedailyplan.push({ task: input.value });
            localStorage.setItem("savetasks", JSON.stringify(storedailyplan));
            rendertask();
        })

    }
    addtasks();

    function deletetask() {
        let delbtn = document.querySelectorAll(".task-card button");
        delbtn.forEach((d, idx) => {
            d.addEventListener("click", () => {
                storedailyplan.splice(idx, 1);
                localStorage.setItem("savetasks", JSON.stringify(storedailyplan));
                rendertask();
            })
        })
    }
    deletetask();
}
dailyplannertask();