    function dayScheduleSlider(daySchedule, markerPosition, setActive){
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
        
        marker.setAttribute('data-top', markerPosition);
    }
