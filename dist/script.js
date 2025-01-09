/*------------------Navigation------------------------ */

$(window).scroll(function() {

    if ($(window).scrollTop() > 300) {
        $('.main_nav').addClass('sticky');
    } else {
        $('.main_nav').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.main_nav').removeClass('open-nav');
    } else {
        $('.main_nav').addClass('open-nav');
    }
});

$('.main_nav li a').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_nav').removeClass('open-nav');
    }
});


/*---------Smooth Scrolling ------------------------------- */

jQuery(document).ready(function($) {

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});
  
});


//TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);



/*------------------Navigation------------------------ */

(function() {
  var animation = {
    countdown: document.querySelector(".countdown"),
    range: function(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    get period() {
      var dateFuture = new Date(2025, 0, 15);
      var dateNow = new Date();
      var seconds = Math.floor((dateFuture - (dateNow))/1000);
      var minutes = Math.floor(seconds/60);
      var hours = Math.floor(minutes/60);
      var days = Math.floor(hours/24);
      hours = hours-(days*24);
      minutes = minutes-(days*24*60)-(hours*60);
      seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
      return {
        year: new Date().getFullYear(),
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }
    },
    element: function(parent, type, className, html) {
      var element = document.createElement(type);
      element.className = className;
      if (typeof html !== "undefined") element.innerHTML = html;
      parent.appendChild(element);
      return element;
    },
    year: function(className) {
      var timeline = new TimelineMax();
      var year = animation.element(animation.countdown, "div", className);
      for (var i=0; i<=String(animation.period.year).length-1; i++) {
        var digit = animation.element(year, "div", "digit", String(animation.period.year).substr(i, 1));
        digit.style.top = (0 - (digit.clientHeight * 2)) + "px";
        timeline
          .to(digit, 0.5, {top: 0, opacity: 1, ease: Bounce.easeOut});
      }
      return year;
    },
    animate: function() {
      var year1 = animation.year("year year1");
      var controls = animation.element(animation.countdown, "div", "controls");
      var days = animation.element(controls, "div", "control days");
      var hours = animation.element(controls, "div", "control hours");
      var minutes = animation.element(controls, "div", "control minutes");
      var seconds = animation.element(controls, "div", "control seconds");
      animation.controls = {
        controls: controls,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
      animation.render();
      var triangles = animation.element(year1, "div", "triangles");
      var fullTimeline = new TimelineMax();
      var triangleStorage = [];
      for (var i=0; i<=50-1; i++) {
        var timeline = new TimelineMax({repeat: -1});
        var triangle = animation.element(triangles, "div", "triangle");
        triangle.style.top = -50 + "px";
        var time = animation.range(0, 100) / 100;
        var duration = 1;
        var direction = animation.range(1, 2) == 1 ? -1 : 1;
        timeline
          .set(triangle, {scale: animation.range(10, 20) / 10}, time)
          .to(triangle, duration * 0.5, {opacity: 1}, time)
          .to(triangle, duration, {top: "200%", rotationZ: animation.range(180, 360) * direction, rotationX: animation.range(180, 360) * direction}, time)
          .to(triangle, duration * 0.5, {opacity: 0}, time + (duration * 0.5));
        fullTimeline.add(timeline, 0);
        triangleStorage.push(triangle);
      }
      var previousWidth = 0;
      var checkWidth = function() {
        if (Math.abs(previousWidth - year1.clientWidth) > 1) {
          for (var i=0; i<=triangleStorage.length-1; i++) {
            triangleStorage[i].style.left = (-5 + animation.range(0, year1.clientWidth)) + "px";
          }
          previousWidth = year1.clientWidth;
        }
        setTimeout(checkWidth, 100);
      }
      checkWidth();
      return new TimelineMax()
        .to(days, 0.5, {top: 0, opacity: 1}, 0)
        .to(hours, 0.5, {top: 0, opacity: 1}, 0.25)
        .to(minutes, 0.5, {top: 0, opacity: 1}, 0.5)
        .to(seconds, 0.5, {top: 0, opacity: 1}, 0.75)
        .set(triangles, {opacity: 1}, 3)
        .add(fullTimeline, 3);
    },
    plural: function(property) {
      var period = animation.period;
      if (String(period[property]).length <= 1) period[property] = "0" + period[property];
      return Number(period[property]) > 1 ? period[property] + " " + property : period[property] + " " + property.substr(0, property.length-1);
    },
    render: function() {
      animation.controls.seconds.innerHTML = animation.plural("seconds");
      animation.controls.minutes.innerHTML = animation.plural("minutes");
      animation.controls.hours.innerHTML = animation.plural("hours");
      animation.controls.days.innerHTML = animation.plural("days");
      requestAnimationFrame(animation.render);
    }
  };
  animation.animate();
})();








// Define the content for each section
const contentData = {
  amdes25: `
    <h2>Welcome to AMDES25</h2>
    <p>
      Welcome to the Asian Materials and Design Education Symposium (AMDES) 2025 happening at Nanyang Technological University! Join us for a dynamic gathering of educators, researchers, and industry professionals passionate about materials and design. Explore cutting-edge education trends, share innovative ideas, and network with like-minded individuals. This in-person event promises to be a hub of creativity and inspiration. Mark your calendars and get ready for an unforgettable experience! Information around session themes and tickets will come soon.
    </p>
  `,
  abstract: `
    <h2>Abstract Submission</h2>
    <p>
      Submit your abstracts now for the AMDES 2025 Symposium! <a href="https://amdesymposium.net/">Link</a>
    </p>
  `,
  housing: `
    <h2>Housing Information</h2>
    <p>
      Discover comfortable and convenient accommodations near NTU for your
      stay during AMDES25. Details to follow.
    </p>
  `,
  registration: `
    <h2>Registration</h2>
    <p>
      Buy your tickets from the NTU marketplace here https://ntumarketplace.ntu.edu.sg/

Please note that this includes the optional workshop on 14th Jan as an opt in option. Contact admin@amdesymposium.net after registering to opt in.
    </p>
  `,
  workshops: `
    <h2>Workshops</h2>
    <p>
      14th Jan : Training Workshops with CADIT
      </p><p>
      15th Jan :  AMDES 2025 Day 1
      </p><p>
      16th Jan : AMDES 2025 Day 2
    </p>
  `,
};

// Add click event listeners to the menu links
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default behavior (jumping to the top)

    const contentKey = link.getAttribute("data-content"); // Get the content key
    const contentArea = document.getElementById("content"); // Select the content area

    // Update the content
    if (contentData[contentKey]) {
      contentArea.innerHTML = contentData[contentKey];
    } else {
      contentArea.innerHTML = `<p>Content not available.</p>`;
    }
  });
});