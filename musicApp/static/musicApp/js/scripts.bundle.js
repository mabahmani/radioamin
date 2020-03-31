"use strict";
//=> Class Definition
var Analytics = Analytics || {};

// $(function () {
//     Analytics = {
//         //=> Initialize function to call all functions of the class
//         init: function () {
//             Analytics.user();
//             Analytics.song();
//             Analytics.purchase();
//             Analytics.statistics();
//         },
//
//         //=> User chart
//         user: function () {
//             if ($('#user').length === 0) {
//                 return false;
//             }
//
//             var userEl = document.getElementById('user').getContext('2d');
//             var data = {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//                 datasets: [{
//                     label: 'Songs',
//                     data: [65, 59, 42, 73, 56, 55, 40],
//                     backgroundColor: '#f11717',
//                     borderColor: '#f11717',
//                     borderWidth: 3,
//                     pointBorderWidth: 0,
//                     pointRadius: 0
//                 }]
//             };
//             var options = {
//                 responsive: true,
//                 legend: {
//                     display: false
//                 },
//                 scales: {
//                     yAxes: [{
//                         display: false,
//                         ticks: {
//                             min: 0,
//                             max: 85
//                         }
//                     }],
//                     xAxes: [{
//                         display: false
//                     }]
//                 },
//                 layout: {
//                     padding: 0,
//                     margin: 0
//                 }
//             };
//             var myLineChart = new Chart(userEl, {
//                 type: 'line',
//                 data: data,
//                 options: options
//             });
//         },
//
//         //=> Song chart
//         song: function () {
//             if ($('#songChart').length === 0) {
//                 return false;
//             }
//
//             var songEl = document.getElementById('songChart').getContext('2d');
//             var data = {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//                 datasets: [{
//                     label: 'Songs',
//                     data: [65, 59, 42, 73, 56, 55, 40],
//                     backgroundColor: '#00c746',
//                     borderColor: '#00c746',
//                     borderWidth: 3,
//                     pointBorderWidth: 0,
//                     pointRadius: 0
//                 }]
//             };
//             var options = {
//                 responsive: true,
//                 legend: {
//                     display: false
//                 },
//                 scales: {
//                     yAxes: [{
//                         display: false,
//                         ticks: {
//                             min: 0,
//                             max: 85
//                         }
//                     }],
//                     xAxes: [{
//                         display: false,
//                         barPercentage: 0.5
//                     }]
//                 },
//                 layout: {
//                     padding: 0,
//                     margin: 0
//                 }
//             };
//             var myLineChart = new Chart(songEl, {
//                 type: 'bar',
//                 data: data,
//                 options: options
//             });
//         },
//
//         //=> Purchase chart
//         purchase: function () {
//             if ($('#purchase').length === 0) {
//                 return false;
//             }
//
//             var userEl = document.getElementById('purchase').getContext('2d');
//             var data = {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//                 datasets: [{
//                     label: 'Songs',
//                     data: [65, 59, 42, 73, 56, 55, 40],
//                     backgroundColor: 'transparent',
//                     borderColor: '#222629',
//                     borderWidth: 3,
//                     pointBorderWidth: 0,
//                     pointRadius: 0
//                 }]
//             };
//             var options = {
//                 responsive: true,
//                 legend: {
//                     display: false
//                 },
//                 scales: {
//                     yAxes: [{
//                         display: false,
//                         ticks: {
//                             min: 0,
//                             max: 85
//                         }
//                     }],
//                     xAxes: [{
//                         display: false,
//                         barPercentage: 0.5
//                     }]
//                 },
//                 layout: {
//                     padding: 0,
//                     margin: 0
//                 }
//             };
//             var myLineChart = new Chart(userEl, {
//                 type: 'line',
//                 data: data,
//                 options: options
//             });
//         },
//
//         //=> Statistics chart
//         statistics: function () {
//             if ($('#userStatistics').length === 0) {
//                 return false;
//             }
//
//             var statisticsEl = document.getElementById('userStatistics').getContext('2d');
//             var data = {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//                 datasets: [{
//                     label: 'User',
//                     data: [65, 59, 42, 73, 56, 55, 40],
//                     backgroundColor: '#ad20d4',
//                     borderColor: 'transparent',
//                     borderWidth: 3,
//                     pointBorderWidth: 0,
//                     pointRadius: 0
//                 }]
//             };
//             var options = {
//                 responsive: true,
//                 legend: {
//                     display: false
//                 },
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             min: 0,
//                             max: 80
//                         }
//                     }],
//                     xAxes: [{
//                         barPercentage: 0.3
//                     }]
//                 },
//                 layout: {
//                     padding: 0,
//                     margin: 0
//                 }
//             };
//             var myLineChart = new Chart(statisticsEl, {
//                 type: 'bar',
//                 data: data,
//                 options: options
//             });
//         }
//     };
//
//     //=> Call class at document ready
//     $(document).ready(Analytics.init);
// });
"use strict";

//=> Class Definition
var AppConfig = AppConfig || {};

$(function () {
    AppConfig = {

        //=> Initialize function to call all functions of the class
        init: function () {
            AppConfig.appRouting();
            AppConfig.initAppScrollbars();
            AppConfig.langCheckedToApply();
            AppConfig.search();
            AppConfig.buttonClickEvents();
            AppConfig.initTheme();
            AppConfig.reInitFunction();
        },

        //=> Reinitialize powerful functions of app
        reInitFunction: function () {
            AppConfig.initSlickCarousel();
            AppConfig.materialTab();
            AppConfig.initCountdown();
            AppConfig.addFavorite();
            //AudioPlayer.init();
            //Analytics.init();
        },

        //=> Handle app routing when page url change
        appRouting: function () {
            var $document = $(document);
            $document.on('click', 'a:not(.load-page):not(.external)', function (e) {
                e.preventDefault();

                var _this = $(this);
                var url = _this.attr('href') !== 'undefined' ?  _this.attr('href') : null ;
                if (url && AppConfig.filterLink(url)) {
                    AppConfig.ajaxLoading(url,true);
                }
            });
            window.addEventListener("popstate", function (event) {
                //window.location.reload()
                AppConfig.ajaxLoading(window.location,false);
            },)
        },

        //=> Filter link a page link or not
        filterLink: function (link) {
            if(link === null) {
                return false;
            } else if(link.substr(0, 1) === '#') {
                return false;
            } else if(link.length >= 10 && link.substr(0,10).toLowerCase() === 'javascript') {
                return false;
            } else if(link.length < 1) {
                return false;
            }

            return true;
        },

        //=> Ajax loading for html pages
        ajaxLoading: function (url,push) {
            if (push) {
                var History = window.history;
                History.pushState("", "", url);
            }

            $.ajax({
                url: url,
                context: document.body
            }).done(function (response) {
                var content = $('<div>' + response + '</div>');
                changeTitle(content);
                replaceImageBanner(content);
                replaceContent(content);
                setActiveClass();
            }).fail(function(jqXHR, textStatus){
                alert('Something went wrong. Please try again');
                return false;
            });

            // Change old title with new one
            function changeTitle(newContent) {
                $('head title').html(newContent.find('title').html());
            }

            // Replace old page banner with new one
            function replaceImageBanner(newContent) {
                var $banner = $('.banner');
                var bannerClass = $banner.attr('class');
                $banner.removeClass(bannerClass.split(' ')[1]);
                $banner.addClass(newContent.find('.banner').attr('class'));
            }

            // Replace old page html with new one
            function replaceContent(newContent) {
                $('#appRoute').html(newContent.find('#appRoute').html());
                $('#wrapper').animate({scrollTop:0}, 'fast');
                //Analytics.init();
                AppConfig.reInitFunction();
            }

            // Set active class on nav link when page url change
            function setActiveClass() {
                var $navLink = $('#sidebar .nav-link');
                $navLink.removeClass('active');
                $navLink.each(function () {
                    if (url === $(this).attr('href')) {
                        $(this).addClass('active');
                    }
                })
            }
        },

        //=> Initialize theme settings
        initTheme: function () {
            $('body').themeSettings();
        },

        //=> Languages checked unchecked for apply button disable and enable
        langCheckedToApply: function () {
            var $langCheckbox = $('#lang .custom-control-input');
            $langCheckbox.on('change', function () {
                $('#langApply').prop('disabled', !$langCheckbox.filter(':checked').length);
            }).trigger('change');
        },

        //=> Initialize app scrollbars
        initAppScrollbars: function () {
            $('[data-scrollable="true"]').each(function () {
                var ps = new PerfectScrollbar(this, {
                    wheelSpeed: 0.5,
                    swipeEasing: true,
                    wheelPropagation: false,
                    minScrollbarLength: 40,
                    suppressScrollX: true
                });
            });
        },

        //=> Slick carousel
        slickCarousel: function (carousel, itemXl, itemLg, itemMd, itemSm) {
            var $carousel = $(carousel);
            var prev = '<button class="btn-prev btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-left"></i></button>';
            var next = '<button class="btn-next btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-right"></i></button>';

            // Set slick carousel
            $carousel.slick({
                arrows: true,
                dots: false,
                infinite: false,
                slidesToShow: itemXl,
                slidesToScroll: 1,
                speed: 1000,
                prevArrow: prev,
                nextArrow: next,
                autoplay: true,

                // Breakpoints
                responsive: [
                    {
                        breakpoint: 1440,
                        settings: {
                            slidesToShow: itemLg
                        }
                    },

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: itemMd
                        }
                    },

                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: itemSm
                        }
                    },

                    {
                        breakpoint: 380,
                        settings: {
                            slidesToShow: 1,
                            arrows: false
                        }
                    }
                ]
            });
        },

        //=> Initialize app slick carousel
        initSlickCarousel: function () {
            AppConfig.slickCarousel('.carousel-item-4', 4, 3, 2, 1);

            AppConfig.slickCarousel('.carousel-item-5', 5, 4, 3, 2);

            AppConfig.slickCarousel('.carousel-item-6', 6, 5, 4, 2);
        },

        //=> App basic buttons click events
        buttonClickEvents: function () {
            $('#toggleSidebar').on('click', function () {
                $body.toggleClass('iconic-sidebar');
            });

            $('#openSidebar').on('click', function (e) {
                e.stopPropagation();
                $body.removeClass('open-search');
                $body.addClass('open-sidebar');
                $sidebarBackdrop.addClass('show');
                $headerBackdrop.removeClass('show');
            });

            $('#hideSidebar').on('click', function () {
                $body.removeClass('open-sidebar');
                $sidebarBackdrop.removeClass('show');
            });

            $('#playList').on('click', function () {
                $body.toggleClass('open-right-sidebar');
            });
        },

        //=> Config search ui events
        search: function () {
            var $search = $('#searchForm #searchInput');

            $search.on('click', function (e) {
                e.stopPropagation();
                $body.addClass('open-search');
                $headerBackdrop.addClass('show');
            });

            $body.on('click', function () {
                $body.removeClass('open-search');
                $headerBackdrop.removeClass('show');
            });
        },

        //=> Material tabs
        materialTab: function () {
            var lineClassName = 'tabs-link-line';
            var $activeLink = $('.line-tabs .nav-item .active');
            var $lineTabsItem = $('.line-tabs .nav-item');

            var line = "<span class='" + lineClassName + "'></span>";
            $('.line-tabs').append(line);

            var activePos = $activeLink.position(),
                activeWidth = $activeLink.parent().width();
            $('.' + lineClassName).stop().css({
                width: activeWidth
            });

            $lineTabsItem.on("click", function() {
                activePos = $(this).position();
                activeWidth = $(this).width();
                $(this).parent().parent().find('.' + lineClassName).stop().css({
                    left: activePos.left,
                    width: activeWidth
                });
            });
        },

        //=> Initialize countdown
        initCountdown: function () {
            var $countdown = $(".countdown");
            var DATE = new Date( $countdown.data('event_date') );
            $countdown.countdown(DATE, function (event) {
                $(this).html(
                    event.strftime(
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%D</div>' +
                        '</div>' +
                        '<span class="time-separate">:</span>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%H</div>' +
                        '</div>' +
                        '<span class="time-separate">:</span>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%M</div>' +
                        '</div>' +
                        '<span class="time-separate">:</span>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%S</div>' +
                        '</div>'
                    )
                );
            });
        },

        //=> Add favorite
        addFavorite: function () {
            var $favorite = $('.favorite');
            var heart = '<li><span class="badge badge-pill badge-danger"><i class="la la-heart"></i></span></li>';

            $favorite.on('click', function (e) {
                e.stopPropagation();
                var $this = $(this);
                var info = $this.closest('.custom-card--info');
                var labels = info.find('.custom-card--labels');

                if (labels.length && !info.find('.custom-card--labels li .la-heart').length) {
                    labels.append(heart);
                } else {
                    var $labels = '<ul class="custom-card--labels d-flex">' +
                        heart +
                        '</ul>';
                    info.prepend($labels);
                }
            })
        }
    };

    var $body = $('body'),
        $headerBackdrop = $('.header-backdrop'),
        $sidebarBackdrop = $('.sidebar-backdrop');

    //=> Call class at document ready
    $(document).ready(AppConfig.init);
});

//=> Loader
$(window).on('load', function () {
    $('#loading').fadeOut(1000);
});

$('#wrapper').on("scroll", function() {
    $('#header').toggleClass('scrolled', $(this).scrollTop() > 80);
});

"use strict";

//=> Class Definition
var AudioPlayer = AudioPlayer || {};

$(function () {
    AudioPlayer = {
        //=> Initialize function to call all functions of the class
        init: function () {
            if ($('#audioPlayer').length === 0) {
                return false;
            }
            AudioPlayer.initAudioPlayer();
            AudioPlayer.volumeDropdownClick();
            AudioPlayer.volumeIconClick();
            AudioPlayer.addAudioInPlayer();
        },

        //=> Initialize audio player
        initAudioPlayer: function () {
            Amplitude.init(
                {"songs": []}
            );
        },

        //=> Volume dropdown click
        volumeDropdownClick: function () {
            $(document).on('click', '.volume-dropdown-menu', function (e) {
                e.stopPropagation();
            });
        },

        //=> Change volume icon in audio player from it's range
        volumeIconClick: function () {
            var $audioInput = $('.audio-volume input[type="range"]');
            var $audioButton = $('.audio-volume .btn');

            $audioInput.on('change', function () {
                var $this = $(this);
                var value = parseInt($this.val(), 10);

                if (value === 0) {
                    $audioButton.html('<i class="ion-md-volume-mute"></i>');
                } else if (value > 0 && value < 70) {
                    $audioButton.html('<i class="ion-md-volume-low"></i>');
                } else if (value > 70) {
                    $audioButton.html('<i class="ion-md-volume-high"></i>');
                }
            })
        },

        //=> Add audio in player on click of card
        addAudioInPlayer: function () {
            var $audio = $('a[data-audio]');
            var $divAudio = $('div[data-audio]');
            var $audio_top_chart = $('a[data-audio_top_chart]');

            $audio_top_chart.each(function () {
                var audioData = $(this).data('audio_top_chart');
                // Amplitude.addSong(audioData);
                // Amplitude.playNow(audioData);
            });

            $audio.on('click', function () {
                var audioData = $(this).data('audio');
                Amplitude.addSong(audioData);
                Amplitude.playNow(audioData);
            });

            $divAudio.on('click', function () {
                var audioData = $(this).data('audio');
                Amplitude.addSong(audioData);
                Amplitude.playNow(audioData);
            });

            $audio_top_chart.on('click', function () {
                var audioData = $(this).data('audio_top_chart');
                Amplitude.addSong(audioData);
                Amplitude.playNow(audioData);
            })
        }
    };

    //=> Call class at document ready
    $(document).ready(AudioPlayer.init);
});

$(function () {
    var searchInput = $("#searchInput");
    searchInput.on('input',function () {
        $.ajax({
              url: "ajax/search/",
              data: {search : searchInput.val()},
              success: function(result){
                  var artist_row = $(".search-card").find(".row").eq(0);
                  var track_row = $(".search-card").find(".row").eq(1);
                  var album_row = $(".search-card").find(".row").eq(2);

                  if (result.artists.length === 0){
                      artist_row.empty()
                  }
                  if (result.tracks.length === 0){
                      track_row.empty()
                  }
                  if (result.albums.length === 0){
                      album_row.empty()
                  }
                  artist_row.empty();
                  $.each(result.artists, function (index, element) {
                      artist_row.append('<div class="col-xl-2 col-md-4 col-6">\n' +
                          '                 <div class="custom-card mb-3">\n' +
                          '                     <a href="artist-details.html" class="text-dark">\n' +
                          '                         <img src="'+element.cover+'" alt="'+element.name+'" class="card-img--radius-md">\n' +
                          '                         <p class="text-truncate mt-2">'+element.name+'</p>\n' +
                          '                     </a>\n' +
                          '                 </div>\n' +
                          '              </div>')


                  });

                  track_row.empty();
                  $.each(result.tracks, function (index, element) {
                      track_row.append('                                <div class="col-xl-4 col-md-6 col-12">\n' +
                          '                                    <div class="custom-card mb-3">\n' +
                          '                                        <a href="song-details.html" class="text-dark custom-card--inline">\n' +
                          '                                            <div class="custom-card--inline-img">\n' +
                          '                                                <img src="'+element.cover+'" alt="'+element.name+'" class="card-img--radius-sm">\n' +
                          '                                            </div>\n' +
                          '\n' +
                          '                                            <div class="custom-card--inline-desc">\n' +
                          '                                                <p class="text-truncate mb-0">'+element.name+'</p>\n' +
                          '                                                <p class="text-truncate text-muted font-sm">'+element.singer+'</p>\n' +
                          '                                            </div>\n' +
                          '                                        </a>\n' +
                          '                                    </div>\n' +
                          '                                </div>')


                  });

                  album_row.empty();
                  $.each(result.albums, function (index, element) {
                      album_row.append('                                <div class="col-xl-4 col-md-6 col-12">\n' +
                          '                                    <div class="custom-card mb-3">\n' +
                          '                                        <a href="song-details.html" class="text-dark custom-card--inline">\n' +
                          '                                            <div class="custom-card--inline-img">\n' +
                          '                                                <img src="'+element.cover+'" alt="'+element.name+'" class="card-img--radius-sm">\n' +
                          '                                            </div>\n' +
                          '\n' +
                          '                                            <div class="custom-card--inline-desc">\n' +
                          '                                                <p class="text-truncate mb-0">'+element.name+'</p>\n' +
                          '                                            </div>\n' +
                          '                                        </a>\n' +
                          '                                    </div>\n' +
                          '                                </div>')
                  });

                  console.log(result)
              }
        });
    })
})


/**
 * Theme Settings v1.0.0
 * Copyright 2019 Kri8thm
 * Licensed under MIT
 *------------------------------------*/

;(function ($, window, document, undefined) {
    function Theme(element, options) {
        this.$body = $('body');

        /*
         * Theme settings options
         */
        this.options = $.extend({}, Theme.Defaults, options);

        /*
         * Options to store in cookies
         */
        this.cookiesOptions = {
            'themeDark': this.options.darkTheme,
            'header': this.options.header,
            'sidebar': this.options.sidebar,
            'player': this.options.player
        };

        /*
         * Get cookies of app and set on options
         */
        if ($.cookie('themeSetting') != null && options === false) {
            this.cookiesOptions = JSON.parse($.cookie('themeSetting'));
            this.options.darkTheme = this.cookiesOptions.themeDark;
            this.options.header = this.cookiesOptions.header;
            this.options.sidebar = this.cookiesOptions.sidebar;
            this.options.player = this.cookiesOptions.player;
        }

        /*
         * Count for checkbox
         */
        this.optionList = [
            {
                'text': 'Dark Theme',
                'value': this.options.darkTheme
            }
        ];

        var pageName = window.location.pathname.split('/').pop().split('.')[0];
        var pages = ['index', 'error'];
        var isSettingNotVisible = pages.includes(pageName);
        if (!isSettingNotVisible) {
            this.initialize();
        }
    }

    /**
     * Default options for the theme.
     * @public
     */
    Theme.Defaults = {
        darkTheme: false,

        header: 0,
        sidebar: 0,
        player: 0,
        themeClass: ['primary', 'danger', 'success', 'warning', 'info', 'brand', 'dark'],

        settingsButton: 'button',
        settingsButtonId: 'customSettings',
        settingsButtonClass: 'btn btn-pill btn-air btn-brand btn-icon-only',
        settingIcon: '<i class="ion-md-settings"></i>',

        itemElement: 'div',
        wrapperId: 'settingsWrapper',

        listClass: 'custom-list',
        listItemClass: 'custom-list--item'
    };

    /**
     * Initializes the theme settings.
     * @protected
     */
    Theme.prototype.initialize = function () {
        var $header = $('#header');
        var $sidebar = $('#sidebar');
        var $player = $('#audioPlayer');

        if (this.options.darkTheme) {
            this.$body.addClass('theme-dark');
        }
        $header.addClass('bg-' + this.options.themeClass[this.options.header]);
        $sidebar.addClass('sidebar-' + this.options.themeClass[this.options.sidebar]);
        $player.addClass('player-' + this.options.themeClass[this.options.player]);
        this.settingsButtonElement();
        this.skinClicks();
    };

    /**
     * Add theme settings button.
     * @protected
     */
    Theme.prototype.settingsButtonElement = function () {
        var attributes = {
            'type': 'button',
            'id': this.options.settingsButtonId,
            'className': this.options.settingsButtonClass
        };

        var btnElement = document.createElement(this.options.settingsButton);
        Object.assign(btnElement, attributes);
        btnElement.innerHTML = this.options.settingIcon;
        this.$body.append(btnElement);
        this.themeOptions();
    };

    /**
     * Add theme settings options.
     * @protected
     */
    Theme.prototype.themeOptions = function () {
        var wrapperElement = document.createElement(this.options.itemElement);
        wrapperElement.setAttribute('id', this.options.wrapperId);

        var header = '<header>' +
            '<span class="title-bold font-md text-uppercase">Theme Settings</span>' +
            '<a href="javascript:void(0)" class="ml-auto"><i class="ion-md-close"></i></a>' +
            '</header>';

        var body = '<div class="theme-settings-body"><ul class="' + this.options.listClass + '">';

        for (var i = 0; i < this.optionList.length; i++) {
            var checked = this.optionList[i].value ? 'checked' : '';

            body += '<li class="' + this.options.listItemClass + '">' +
                '<label for="to' + i + '">' + this.optionList[i].text + '</label>' +
                '<div class="custom-control custom-checkbox ml-auto">' +
                '<input type="checkbox" class="custom-control-input" id="to' + i + '" ' + checked + '>' +
                '<label class="custom-control-label" for="to' + i + '"></label>' +
                '</div>' +
                '</li>';
        }

        body += '<li class="custom-list-group--item-separator"></li>' +
            '<li class="custom-list-group--item custom-list-group--item-header">Header Colors</li>' +
            '<li class="' + this.options.listItemClass + '">';

        for (var j = 0; j < this.options.themeClass.length; j++) {
            var activeClass = j === this.options.header ? 'active' : '';
            body += '<a href="javascript:void(0);" class="header-skin bg-' + this.options.themeClass[j] + ' ' + activeClass + '" ' +
                'data-header-skin="' + j + '"></a>';
        }

        body += '</li>';

        body += '<li class="custom-list-group--item-separator"></li>' +
            '<li class="custom-list-group--item custom-list-group--item-header">Sidebar Colors</li>' +
            '<li class="' + this.options.listItemClass + '">';

        for (var k = 0; k < this.options.themeClass.length; k++) {
            var activeClassSidebar = k === this.options.sidebar ? 'active' : '';
            body += '<a href="javascript:void(0);" class="sidebar-skin bg-' + this.options.themeClass[k] + ' ' + activeClassSidebar + '" ' +
                'data-sidebar-skin="' + k + '"></a>';
        }

        body += '</li>';

        body += '<li class="custom-list-group--item-separator"></li>' +
            '<li class="custom-list-group--item custom-list-group--item-header">Player Colors</li>' +
            '<li class="' + this.options.listItemClass + '">';

        for (var m = 0; m < this.options.themeClass.length; m++) {
            var activeClassPlayer = m === this.options.player ? 'active' : '';
            body += '<a href="javascript:void(0);" class="player-skin bg-' + this.options.themeClass[m] + ' ' + activeClassPlayer + '" ' +
                'data-player-skin="' + m + '"></a>';
        }

        body += '</li>';

        body += '</ul></div>';

        wrapperElement.innerHTML = header + body;
        this.$body.append(wrapperElement);
    };

    /**
     * App click events.
     * @protected
     */
    Theme.prototype.skinClicks = function () {
        var _this = this;
        var settings = '#' + _this.options.settingsButtonId;
        var $wrapper = $('#' + _this.options.wrapperId);
        var $header = $('#header');
        var $sidebar = $('#sidebar');
        var $player = $('#audioPlayer');
        var $headerSkin = $('.header-skin');
        var $sidebarSkin = $('.sidebar-skin');
        var $playerSkin = $('.player-skin');

        this.$body.on('click', '#to0', function () {
            var $this = $(this);
            _this.cookiesOptions.themeDark = $this[0].checked;
            _this.$body.toggleClass('theme-dark');
            _this.setCookies();
        });

        this.$body.on('click', '.header-skin', function () {
            var $this = $(this);
            var headerSkin = $this.data('header-skin');
            _this.cookiesOptions.header = headerSkin;
            $header.removeClass();
            $header.addClass('bg-' + _this.options.themeClass[headerSkin]);
            $headerSkin.removeClass('active');
            $this.addClass('active');
            _this.setCookies();
        });

        this.$body.on('click', '.sidebar-skin', function () {
            var $this = $(this);
            var sidebarSkin = $this.data('sidebar-skin');
            _this.cookiesOptions.sidebar = sidebarSkin;
            $sidebar.removeClass();
            $sidebar.addClass('sidebar-' + _this.options.themeClass[sidebarSkin]);
            $sidebarSkin.removeClass('active');
            $this.addClass('active');
            _this.setCookies();
        });

        this.$body.on('click', '.player-skin', function () {
            var $this = $(this);
            var playerSkin = $this.data('player-skin');
            _this.cookiesOptions.player = playerSkin;
            $player.removeClass();
            $player.addClass('player-' + _this.options.themeClass[playerSkin]);
            $playerSkin.removeClass('active');
            $this.addClass('active');
            _this.setCookies();
        });

        this.$body.on('click', settings, function () {
            $wrapper.toggleClass('open-settings');
        });

        this.$body.on('click', 'header a', function () {
            $wrapper.removeClass('open-settings');
        });
    };

    /**
     * Set app cookies.
     * @protected
     */
    Theme.prototype.setCookies = function () {
        $.cookie('themeSetting', JSON.stringify(this.cookiesOptions), {expires: 7, path: '/'});
    };

    /**
     * The jQuery Plugin for the Theme Setting
     * @public
     */
    $.fn.themeSettings = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = new Theme(this, typeof option === 'object' && option);
        });
    };

    /**
     * The constructor for the jQuery Plugin
     * @public
     */
    $.fn.themeSettings.Constructor = Theme;

})(jQuery, window, document);


/*
 * jQuery Address Plugin v1.5
 * http://www.asual.com/jquery/address/
 *
 * Copyright (c) 2009-2010 Rostislav Hristov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012-11-18 23:51:44 +0200 (Sun, 18 Nov 2012)
 */
(function ($) {

    $.address = (function () {

        var _trigger = function(name) {
               var ev = $.extend($.Event(name),
                 (function() {
                            var parameters = {},
                                parameterNames = $.address.parameterNames();
                            for (var i = 0, l = parameterNames.length; i < l; i++) {
                                parameters[parameterNames[i]] = $.address.parameter(parameterNames[i]);
                            }
                            return {
                                value: $.address.value(),
                                path: $.address.path(),
                                pathNames: $.address.pathNames(),
                                parameterNames: parameterNames,
                                parameters: parameters,
                                queryString: $.address.queryString()
                            };
                        }).call($.address)
                    );

               $($.address).trigger(ev);
               return ev;
            },
            _array = function(obj) {
                return Array.prototype.slice.call(obj);
            },
            _bind = function(value, data, fn) {
                $().bind.apply($($.address), Array.prototype.slice.call(arguments));
                return $.address;
            },
            _unbind = function(value,  fn) {
                $().unbind.apply($($.address), Array.prototype.slice.call(arguments));
                return $.address;
            },
            _supportsState = function() {
                return (_h.pushState && _opts.state !== UNDEFINED);
            },
            _hrefState = function() {
                return ('/' + _l.pathname.replace(new RegExp(_opts.state), '') +
                    _l.search + (_hrefHash() ? '#' + _hrefHash() : '')).replace(_re, '/');
            },
            _hrefHash = function() {
                var index = _l.href.indexOf('#');
                return index != -1 ? _crawl(_l.href.substr(index + 1), FALSE) : '';
            },
            _href = function() {
                return _supportsState() ? _hrefState() : _hrefHash();
            },
            _window = function() {
                try {
                    return top.document !== UNDEFINED && top.document.title !== UNDEFINED ? top : window;
                } catch (e) {
                    return window;
                }
            },
            _js = function() {
                return 'javascript';
            },
            _strict = function(value) {
                value = value.toString();
                return (_opts.strict && value.substr(0, 1) != '/' ? '/' : '') + value;
            },
            _crawl = function(value, direction) {
                if (_opts.crawlable && direction) {
                    return (value !== '' ? '!' : '') + value;
                }
                return value.replace(/^\!/, '');
            },
            _cssint = function(el, value) {
                return parseInt(el.css(value), 10);
            },

            // Hash Change Callback
            _listen = function() {
                if (!_silent) {
                    var hash = _href(),
                        diff = decodeURI(_value) != decodeURI(hash);
                    if (diff) {
                        if (_msie && _version < 7) {
                            _l.reload();
                        } else {
                            if (_msie && !_hashchange && _opts.history) {
                                _st(_html, 50);
                            }
                            _old = _value;
                            _value = hash;
                            _update(FALSE);
                        }
                    }
                }
            },

            _update = function(internal) {
                var changeEv = _trigger(CHANGE),
                    xChangeEv = _trigger(internal ? INTERNAL_CHANGE : EXTERNAL_CHANGE);

                _st(_track, 10);

                if (changeEv.isDefaultPrevented() || xChangeEv.isDefaultPrevented()){
                  _preventDefault();
                }
            },

            _preventDefault = function(){
              _value = _old;

              if (_supportsState()) {
                  _h.popState({}, '', _opts.state.replace(/\/$/, '') + (_value === '' ? '/' : _value));
              } else {
                  _silent = TRUE;
                  if (_webkit) {
                      if (_opts.history) {
                          _l.hash = '#' + _crawl(_value, TRUE);
                      } else {
                          _l.replace('#' + _crawl(_value, TRUE));
                      }
                  } else if (_value != _href()) {
                      if (_opts.history) {
                          _l.hash = '#' + _crawl(_value, TRUE);
                      } else {
                          _l.replace('#' + _crawl(_value, TRUE));
                      }
                  }
                  if ((_msie && !_hashchange) && _opts.history) {
                      _st(_html, 50);
                  }
                  if (_webkit) {
                      _st(function(){ _silent = FALSE; }, 1);
                  } else {
                      _silent = FALSE;
                  }
              }

            },

            _track = function() {
                if (_opts.tracker !== 'null' && _opts.tracker !== NULL) {
                    var fn = $.isFunction(_opts.tracker) ? _opts.tracker : _t[_opts.tracker],
                        value = (_l.pathname + _l.search +
                                ($.address && !_supportsState() ? $.address.value() : ''))
                                .replace(/\/\//, '/').replace(/^\/$/, '');
                    if ($.isFunction(fn)) {
                        fn(value);
                    } else if ($.isFunction(_t.urchinTracker)) {
                        _t.urchinTracker(value);
                    } else if (_t.pageTracker !== UNDEFINED && $.isFunction(_t.pageTracker._trackPageview)) {
                        _t.pageTracker._trackPageview(value);
                    } else if (_t._gaq !== UNDEFINED && $.isFunction(_t._gaq.push)) {
                        _t._gaq.push(['_trackPageview', decodeURI(value)]);
                    }
                }
            },
            _html = function() {
                var src = _js() + ':' + FALSE + ';document.open();document.writeln(\'<html><head><title>' +
                    _d.title.replace(/\'/g, '\\\'') + '</title><script>var ' + ID + ' = "' + encodeURIComponent(_href()).replace(/\'/g, '\\\'') +
                    (_d.domain != _l.hostname ? '";document.domain="' + _d.domain : '') +
                    '";</' + 'script></head></html>\');document.close();';
                if (_version < 7) {
                    _frame.src = src;
                } else {
                    _frame.contentWindow.location.replace(src);
                }
            },
            _options = function() {
                if (_url && _qi != -1) {
                    var i, param, params = _url.substr(_qi + 1).split('&');
                    for (i = 0; i < params.length; i++) {
                        param = params[i].split('=');
                        if (/^(autoUpdate|crawlable|history|strict|wrap)$/.test(param[0])) {
                            _opts[param[0]] = (isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : (parseInt(param[1], 10) !== 0));
                        }
                        if (/^(state|tracker)$/.test(param[0])) {
                            _opts[param[0]] = param[1];
                        }
                    }
                    _url = NULL;
                }
                _old = _value;
                _value = _href();
            },
            _load = function() {
                if (!_loaded) {
                    _loaded = TRUE;
                    _options();
                    var complete = function() {
                            _enable.call(this);
                            _unescape.call(this);
                        },
                        body = $('body').ajaxComplete(complete);
                    complete();
                    if (_opts.wrap) {
                        var wrap = $('body > *')
                            .wrapAll('<div style="padding:' +
                                (_cssint(body, 'marginTop') + _cssint(body, 'paddingTop')) + 'px ' +
                                (_cssint(body, 'marginRight') + _cssint(body, 'paddingRight')) + 'px ' +
                                (_cssint(body, 'marginBottom') + _cssint(body, 'paddingBottom')) + 'px ' +
                                (_cssint(body, 'marginLeft') + _cssint(body, 'paddingLeft')) + 'px;" />')
                            .parent()
                            .wrap('<div id="' + ID + '" style="height:100%;overflow:auto;position:relative;' +
                                (_webkit && !window.statusbar.visible ? 'resize:both;' : '') + '" />');
                        $('html, body')
                            .css({
                                height: '100%',
                                margin: 0,
                                padding: 0,
                                overflow: 'hidden'
                            });
                        if (_webkit) {
                            $('<style type="text/css" />')
                                .appendTo('head')
                                .text('#' + ID + '::-webkit-resizer { background-color: #fff; }');
                        }
                    }
                    if (_msie && !_hashchange) {
                        var frameset = _d.getElementsByTagName('frameset')[0];
                        _frame = _d.createElement((frameset ? '' : 'i') + 'frame');
                        _frame.src = _js() + ':' + FALSE;
                        if (frameset) {
                            frameset.insertAdjacentElement('beforeEnd', _frame);
                            frameset[frameset.cols ? 'cols' : 'rows'] += ',0';
                            _frame.noResize = TRUE;
                            _frame.frameBorder = _frame.frameSpacing = 0;
                        } else {
                            _frame.style.display = 'none';
                            _frame.style.width = _frame.style.height = 0;
                            _frame.tabIndex = -1;
                            _d.body.insertAdjacentElement('afterBegin', _frame);
                        }
                        _st(function() {
                            $(_frame).bind('load', function() {
                                var win = _frame.contentWindow;
                                _old = _value;
                                _value = win[ID] !== UNDEFINED ? win[ID] : '';
                                if (_value != _href()) {
                                    _update(FALSE);
                                    _l.hash = _crawl(_value, TRUE);
                                }
                            });
                            if (_frame.contentWindow[ID] === UNDEFINED) {
                                _html();
                            }
                        }, 50);
                    }
                    _st(function() {
                        _trigger('init');
                        _update(FALSE);
                    }, 1);
                    if (!_supportsState()) {
                        if ((_msie && _version > 7) || (!_msie && _hashchange)) {
                            if (_t.addEventListener) {
                                _t.addEventListener(HASH_CHANGE, _listen, FALSE);
                            } else if (_t.attachEvent) {
                                _t.attachEvent('on' + HASH_CHANGE, _listen);
                            }
                        } else {
                            _si(_listen, 50);
                        }
                    }
                    if ('state' in window.history) {
                        $(window).trigger('popstate');
                    }
                }
            },
            _enable = function() {
                var el,
                    elements = $('a'),
                    length = elements.size(),
                    delay = 1,
                    index = -1,
                    sel = '[rel*="address:"]',
                    fn = function() {
                        if (++index != length) {
                            el = $(elements.get(index));
                            if (el.is(sel)) {
                                el.address(sel);
                            }
                            _st(fn, delay);
                        }
                    };
                _st(fn, delay);
            },
            _popstate = function() {
                if (decodeURI(_value) != decodeURI(_href())) {
                    _old = _value;
                    _value = _href();
                    _update(FALSE);
                }
            },
            _unload = function() {
                if (_t.removeEventListener) {
                    _t.removeEventListener(HASH_CHANGE, _listen, FALSE);
                } else if (_t.detachEvent) {
                    _t.detachEvent('on' + HASH_CHANGE, _listen);
                }
            },
            _unescape = function() {
                if (_opts.crawlable) {
                    var base = _l.pathname.replace(/\/$/, ''),
                        fragment = '_escaped_fragment_';
                    if ($('body').html().indexOf(fragment) != -1) {
                        $('a[href]:not([href^=http]), a[href*="' + document.domain + '"]').each(function() {
                            var href = $(this).attr('href').replace(/^http:/, '').replace(new RegExp(base + '/?$'), '');
                            if (href === '' || href.indexOf(fragment) != -1) {
                                $(this).attr('href', '#' + encodeURI(decodeURIComponent(href.replace(new RegExp('/(.*)\\?' +
                                    fragment + '=(.*)$'), '!$2'))));
                            }
                        });
                    }
                }
            },
            UNDEFINED,
            NULL = null,
            ID = 'jQueryAddress',
            STRING = 'string',
            HASH_CHANGE = 'hashchange',
            INIT = 'init',
            CHANGE = 'change',
            INTERNAL_CHANGE = 'internalChange',
            EXTERNAL_CHANGE = 'externalChange',
            TRUE = true,
            FALSE = false,
            _opts = {
                autoUpdate: TRUE,
                crawlable: FALSE,
                history: TRUE,
                strict: TRUE,
                wrap: FALSE
            },
            _browser = $.browser,
            _version = parseFloat(_browser.version),
            _msie = !$.support.opacity,
            _webkit = _browser.webkit || _browser.safari,
            _t = _window(),
            _d = _t.document,
            _h = _t.history,
            _l = _t.location,
            _si = setInterval,
            _st = setTimeout,
            _re = /\/{2,9}/g,
            _agent = navigator.userAgent,
            _hashchange = 'on' + HASH_CHANGE in _t,
            _frame,
            _form,
            _url = $('script:last').attr('src'),
            _qi = _url ? _url.indexOf('?') : -1,
            _title = _d.title,
            _silent = FALSE,
            _loaded = FALSE,
            _juststart = TRUE,
            _updating = FALSE,
            _listeners = {},
            _value = _href();
            _old = _value;

        if (_msie) {
            _version = parseFloat(_agent.substr(_agent.indexOf('MSIE') + 4));
            if (_d.documentMode && _d.documentMode != _version) {
                _version = _d.documentMode != 8 ? 7 : 8;
            }
            var pc = _d.onpropertychange;
            _d.onpropertychange = function() {
                if (pc) {
                    pc.call(_d);
                }
                if (_d.title != _title && _d.title.indexOf('#' + _href()) != -1) {
                    _d.title = _title;
                }
            };
        }

        if (_h.navigationMode) {
            _h.navigationMode = 'compatible';
        }
        if (document.readyState == 'complete') {
            var interval = setInterval(function() {
                if ($.address) {
                    _load();
                    clearInterval(interval);
                }
            }, 50);
        } else {
            _options();
            $(_load);
        }
        $(window).bind('popstate', _popstate).bind('unload', _unload);

        return {
            bind: function(type, data, fn) {
                return _bind.apply(this, _array(arguments));
            },
            unbind: function(type, fn) {
                return _unbind.apply(this, _array(arguments));
            },
            init: function(data, fn) {
                return _bind.apply(this, [INIT].concat(_array(arguments)));
            },
            change: function(data, fn) {
                return _bind.apply(this, [CHANGE].concat(_array(arguments)));
            },
            internalChange: function(data, fn) {
                return _bind.apply(this, [INTERNAL_CHANGE].concat(_array(arguments)));
            },
            externalChange: function(data, fn) {
                return _bind.apply(this, [EXTERNAL_CHANGE].concat(_array(arguments)));
            },
            baseURL: function() {
                var url = _l.href;
                if (url.indexOf('#') != -1) {
                    url = url.substr(0, url.indexOf('#'));
                }
                if (/\/$/.test(url)) {
                    url = url.substr(0, url.length - 1);
                }
                return url;
            },
            autoUpdate: function(value) {
                if (value !== UNDEFINED) {
                    _opts.autoUpdate = value;
                    return this;
                }
                return _opts.autoUpdate;
            },
            crawlable: function(value) {
                if (value !== UNDEFINED) {
                    _opts.crawlable = value;
                    return this;
                }
                return _opts.crawlable;
            },
            history: function(value) {
                if (value !== UNDEFINED) {
                    _opts.history = value;
                    return this;
                }
                return _opts.history;
            },
            state: function(value) {
                if (value !== UNDEFINED) {
                    _opts.state = value;
                    var hrefState = _hrefState();
                    if (_opts.state !== UNDEFINED) {
                        if (_h.pushState) {
                            if (hrefState.substr(0, 3) == '/#/') {
                                _l.replace(_opts.state.replace(/^\/$/, '') + hrefState.substr(2));
                            }
                        } else if (hrefState != '/' && hrefState.replace(/^\/#/, '') != _hrefHash()) {
                            _st(function() {
                                _l.replace(_opts.state.replace(/^\/$/, '') + '/#' + hrefState);
                            }, 1);
                        }
                    }
                    return this;
                }
                return _opts.state;
            },
            strict: function(value) {
                if (value !== UNDEFINED) {
                    _opts.strict = value;
                    return this;
                }
                return _opts.strict;
            },
            tracker: function(value) {
                if (value !== UNDEFINED) {
                    _opts.tracker = value;
                    return this;
                }
                return _opts.tracker;
            },
            wrap: function(value) {
                if (value !== UNDEFINED) {
                    _opts.wrap = value;
                    return this;
                }
                return _opts.wrap;
            },
            update: function() {
                _updating = TRUE;
                this.value(_value);
                _updating = FALSE;
                return this;
            },
            title: function(value) {
                if (value !== UNDEFINED) {
                    _st(function() {
                        _title = _d.title = value;
                        if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                            _frame.contentWindow.document.title = value;
                            _juststart = FALSE;
                        }
                    }, 50);
                    return this;
                }
                return _d.title;
            },
            value: function(value) {
                if (value !== UNDEFINED) {
                    value = _strict(value);
                    if (value == '/') {
                        value = '';
                    }
                    if (_value == value && !_updating) {
                        return;
                    }
                    _old = _value;
                    _value = value;
                    if (_opts.autoUpdate || _updating) {
                        _update(TRUE);
                        if (_supportsState()) {
                            _h[_opts.history ? 'pushState' : 'replaceState']({}, '',
                                    _opts.state.replace(/\/$/, '') + (_value === '' ? '/' : _value));
                        } else {
                            _silent = TRUE;
                            if (_webkit) {
                                if (_opts.history) {
                                    _l.hash = '#' + _crawl(_value, TRUE);
                                } else {
                                    _l.replace('#' + _crawl(_value, TRUE));
                                }
                            } else if (_value != _href()) {
                                if (_opts.history) {
                                    _l.hash = '#' + _crawl(_value, TRUE);
                                } else {
                                    _l.replace('#' + _crawl(_value, TRUE));
                                }
                            }
                            if ((_msie && !_hashchange) && _opts.history) {
                                _st(_html, 50);
                            }
                            if (_webkit) {
                                _st(function(){ _silent = FALSE; }, 1);
                            } else {
                                _silent = FALSE;
                            }
                        }
                    }
                    return this;
                }
                return _strict(_value);
            },
            path: function(value) {
                if (value !== UNDEFINED) {
                    var qs = this.queryString(),
                        hash = this.hash();
                    this.value(value + (qs ? '?' + qs : '') + (hash ? '#' + hash : ''));
                    return this;
                }
                return _strict(_value).split('#')[0].split('?')[0];
            },
            pathNames: function() {
                var path = this.path(),
                    names = path.replace(_re, '/').split('/');
                if (path.substr(0, 1) == '/' || path.length === 0) {
                    names.splice(0, 1);
                }
                if (path.substr(path.length - 1, 1) == '/') {
                    names.splice(names.length - 1, 1);
                }
                return names;
            },
            queryString: function(value) {
                if (value !== UNDEFINED) {
                    var hash = this.hash();
                    this.value(this.path() + (value ? '?' + value : '') + (hash ? '#' + hash : ''));
                    return this;
                }
                var arr = _value.split('?');
                return arr.slice(1, arr.length).join('?').split('#')[0];
            },
            parameter: function(name, value, append) {
                var i, params;
                if (value !== UNDEFINED) {
                    var names = this.parameterNames();
                    params = [];
                    value = value === UNDEFINED || value === NULL ? '' : value.toString();
                    for (i = 0; i < names.length; i++) {
                        var n = names[i],
                            v = this.parameter(n);
                        if (typeof v == STRING) {
                            v = [v];
                        }
                        if (n == name) {
                            v = (value === NULL || value === '') ? [] :
                                (append ? v.concat([value]) : [value]);
                        }
                        for (var j = 0; j < v.length; j++) {
                            params.push(n + '=' + v[j]);
                        }
                    }
                    if ($.inArray(name, names) == -1 && value !== NULL && value !== '') {
                        params.push(name + '=' + value);
                    }
                    this.queryString(params.join('&'));
                    return this;
                }
                value = this.queryString();
                if (value) {
                    var r = [];
                    params = value.split('&');
                    for (i = 0; i < params.length; i++) {
                        var p = params[i].split('=');
                        if (p[0] == name) {
                            r.push(p.slice(1).join('='));
                        }
                    }
                    if (r.length !== 0) {
                        return r.length != 1 ? r : r[0];
                    }
                }
            },
            parameterNames: function() {
                var qs = this.queryString(),
                    names = [];
                if (qs && qs.indexOf('=') != -1) {
                    var params = qs.split('&');
                    for (var i = 0; i < params.length; i++) {
                        var name = params[i].split('=')[0];
                        if ($.inArray(name, names) == -1) {
                            names.push(name);
                        }
                    }
                }
                return names;
            },
            hash: function(value) {
                if (value !== UNDEFINED) {
                    this.value(_value.split('#')[0] + (value ? '#' + value : ''));
                    return this;
                }
                var arr = _value.split('#');
                return arr.slice(1, arr.length).join('#');
            }
        };
    })();

    $.fn.address = function(fn) {
        var sel;
        if (typeof fn == 'string') {
            sel = fn;
            fn = undefined;
        }
        if (!$(this).attr('address')) {
            var f = function(e) {
                if (e.shiftKey || e.ctrlKey || e.metaKey || e.which == 2) {
                    return true;
                }
                if ($(this).is('a')) {
                    e.preventDefault();
                    var value = fn ? fn.call(this) :
                        /address:/.test($(this).attr('rel')) ? $(this).attr('rel').split('address:')[1].split(' ')[0] :
                        $.address.state() !== undefined && !/^\/?$/.test($.address.state()) ?
                                $(this).attr('href').replace(new RegExp('^(.*' + $.address.state() + '|\\.)'), '') :
                                $(this).attr('href').replace(/^(#\!?|\.)/, '');
                    $.address.value(value);
                }
            };
            $(sel ? sel : this).live('click', f).live('submit', function(e) {
                if ($(this).is('form')) {
                    e.preventDefault();
                    var action = $(this).attr('action'),
                        value = fn ? fn.call(this) : (action.indexOf('?') != -1 ? action.replace(/&$/, '') : action + '?') +
                            $(this).serialize();
                    $.address.value(value);
                }
            }).attr('address', true);
        }
        return this;
    };

})(jQuery);