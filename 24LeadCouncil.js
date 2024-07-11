function dayScheduleSlider(t, daySchedule, markerPosition, setActive){
    const toggleOptions = ['.toggle.start-here', '.toggle.thu', '.toggle.fri', '.toggle.sat'];
    const dayOptions = ['.day-schedule.start-here', '.day-schedule.thu', '.day-schedule.fri', '.day-schedule.sat'];

    const marker = document.querySelector('.schedule-toggles');
    var day = document.querySelector(daySchedule);

    toggleOptions.forEach(o => {
        if(o != setActive){
            document.querySelector(o).setAttribute('data-active', 'false')
        }else {
            document.querySelector(o).setAttribute('data-active', 'true')
        }
    })
    console.log(t);
    marker.setAttribute('data-top', markerPosition);
}

document.querySelectorAll('.toggle').forEach(t => t.addEventListener('click',()=>{
    console.log(t);
    dayScheduleSlider(t, t.getAttribute('data-day'), t.getAttribute('data-top'), t.getAttribute('set-active'));
    console.log(t.getAttribute('data-day'), t.getAttribute('data-top'), t.getAttribute('set-active'));
}))
