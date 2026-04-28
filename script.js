document.addEventListener('DOMContentLoaded', () => {

  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function setTheme (mode) {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.textContent = (mode === 'dark' ? '☀️' : '🌙');

    document.documentElement
            .style
            .setProperty('--img-filter', (mode === 'dark' ? 'invert(1)' : 'none'));
  }

  setTheme(localStorage.getItem('theme')
          || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  $('#theme-toggle')?.addEventListener('click', () =>
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  $('#download-pdf')?.addEventListener('click', () => {
    window.print();
  });


  new TypeIt('#typeit', { speed: 50, startDelay: 300 })
     .type('Laravel API + 웹/앱/QR 3개 클라이언트 + Pusher·Aligo 실시간 인프라를 운영하는 현직 개발자입니다.')
     .go();

  let tabClicked = false;
  const skillCards = $$('.skill-card');

  const filterSkills = cat => {
    skillCards.forEach(c => {
      c.style.opacity = (!cat || c.dataset.cat === cat) ? '1' : '0.2';
    });
  };
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => filterSkills(btn.dataset.cat));
    btn.addEventListener('mouseleave', () => filterSkills(tabClicked ? btn.dataset.cat : null));
    btn.addEventListener('click', () => {
      if (tabClicked && btn.classList.contains('active')) {
        tabClicked = false; filterSkills(null);
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
      } else {
        tabClicked = true;
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterSkills(btn.dataset.cat);
      }
    });
  });
  filterSkills(null);

  (() => {
    const modal  = $('#videoModal'),
          video  = $('#videoPlayer'),
          source = video.querySelector('source'),
          originalSrc = source.getAttribute('src'),
          closeX = modal.querySelector('.modal-close');

    window.openVideoModal = src => {
      if (src) source.src = src;
      video.load();
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('show'));
      video.currentTime = 0;
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    const close = () => {
      modal.classList.remove('show');
      video.pause(); video.currentTime = 0;
      modal.addEventListener('transitionend', () => {
        modal.style.display = 'none';
        source.src = originalSrc;
        video.load();
      }, { once: true });
    };
    window.closeVideoModal = close;
    closeX .addEventListener('click', e => { e.stopPropagation(); close(); });
    modal  .addEventListener('click', e => { if (e.target === modal) close(); });
    window .addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'flex') close(); });
  })();

  (() => {
    const modal  = $('#imageModal'),
          viewer = $('#imageViewer'),
          prevBt = modal.querySelector('.prev'),
          nextBt = modal.querySelector('.next'),
          closeX = modal.querySelector('.modal-close');

    let list = [], idx = 0;

    window.openImageModal = imgArr => {
      list = Array.isArray(imgArr) ? imgArr : [imgArr];
      idx  = 0; update();
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('show'));
    };

    const update = () => {
      viewer.src = list[idx];
      prevBt.style.visibility = nextBt.style.visibility = list.length > 1 ? 'visible' : 'hidden';
    };
    const close = () => {
      modal.classList.remove('show');
      modal.addEventListener('transitionend', () => modal.style.display = 'none', { once: true });
    };
    window.closeImageModal = close;

    prevBt.onclick = e => { e.stopPropagation(); idx = (idx - 1 + list.length) % list.length; update(); };
    nextBt.onclick = e => { e.stopPropagation(); idx = (idx + 1) % list.length; update(); };
    closeX.onclick = e => { e.stopPropagation(); close(); };
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    window.addEventListener('keydown', e => {
      if (modal.style.display === 'flex') {
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft')  prevBt.onclick(e);
        else if (e.key === 'ArrowRight') nextBt.onclick(e);
      }
    });
  })();

  const books = {
    analysis: {
      '청소년정신건강':    Array.from({ length: 8  }, (_, i) => `img/book/mental-health-youth/mental-health-youth_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '지하철 이용현황':  Array.from({ length: 6  }, (_, i) => `img/book/subway-usage/subway-usage_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '인천공항 이용자수': Array.from({ length: 7  }, (_, i) => `img/book/incheon-airport/incheon-airport_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '연령별 취업자수':  Array.from({ length: 9  }, (_, i) => `img/book/employment-by-age/employment-by-age_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '연령별 인구 분포 분석': Array.from({ length: 19 }, (_, i) => `img/book/population-by-age/population-by-age_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '쇼핑몰 시각화':   Array.from({ length: 5  }, (_, i) => `img/book/shopping-mall/shopping-mall_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '방범용CCTV인구데이터분석':   Array.from({ length: 15 }, (_, i) => `img/book/cctv-population/cctv-population_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '교통사고유형별발생': Array.from({ length: 20 }, (_, i) => `img/book/traffic-accidents/traffic-accidents_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '팁문화분석':      Array.from({ length: 9  }, (_, i) => `img/book/tips-seaborn/tips-seaborn_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '공간정보':        Array.from({ length: 5  }, (_, i) => `img/book/spatial-info/spatial-info_page-${String(i + 1).padStart(4, '0')}.jpg`)
    },
    crawling: {
      '셀레니움1':     Array.from({ length: 9  }, (_, i) => `img/book/selenium-crawl/selenium-crawl-1_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '셀레니움2':     Array.from({ length: 2 }, (_, i) => `img/book/selenium-crawl/selenium-crawl-2_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '셀레니움3':     Array.from({ length: 21 }, (_, i) => `img/book/selenium-crawl/selenium-crawl-3_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '스타벅스크롤링': Array.from({ length: 21 }, (_, i) => `img/book/starbucks-crawl/starbucks-crawl_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '인스타크롤링':   Array.from({ length: 11 }, (_, i) => `img/book/instagram-crawl/instagram-crawl_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '주유소크롤링1':  Array.from({ length: 4  }, (_, i) => `img/book/gas-station/gas-station-1_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '주유소크롤링2':  Array.from({ length: 8  }, (_, i) => `img/book/gas-station/gas-station-2_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '최저가주유':     Array.from({ length: 30 }, (_, i) => `img/book/cheapest-gas/cheapest-gas_page-${String(i + 1).padStart(4, '0')}.jpg`)
    }
  };

  const bookModal   = $('#book-modal'),
        bookBox     = bookModal.querySelector('.book-box'),
        selectorBox = $('#book-selector'),
        flipbook    = $('#flipbook'),
        titleEl     = $('#book-title'),
        pageNumEl   = $('.page-number');

  let pageArr = [], pageIdx = 0;

  window.openBookModal = category => {
    bookModal.style.display = 'flex';
    requestAnimationFrame(() => bookModal.classList.add('show'));

    bookBox    .classList.remove('viewing');
    selectorBox.style.display = 'block';
    flipbook   .style.display = 'none';
    titleEl    .style.display = 'none';
    pageNumEl  .style.display = 'none';

    $$('#book-selector .book-card').forEach(card => {
      card.style.display = (card.dataset.category === category ? 'block' : 'none');
    });
  };

  window.loadBook = title => {
    pageArr = books.analysis[title] || books.crawling[title] || [];
    if (!pageArr.length) return;

    flipbook.innerHTML = '';
    pageArr.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = encodeURI(src); img.className = 'book-page';
      img.style.display = i ? 'none' : 'block';
      flipbook.appendChild(img);
    });

    pageIdx = 0;
    bookBox    .classList.add('viewing');
    selectorBox.style.display = 'none';
    flipbook   .style.display = 'flex';
    titleEl    .textContent   = title;
    titleEl    .style.display = 'block';
    titleEl.style.writingMode  = 'horizontal-tb';
    pageNumEl  .style.display = 'block';
    pageNumEl  .textContent   = `1 / ${pageArr.length}`;
  };

  window.nextPage = () => {
    if (pageIdx < pageArr.length - 1) {
      flipbook.children[pageIdx].style.display = 'none';
      pageIdx++;
      flipbook.children[pageIdx].style.display = 'block';
      pageNumEl.textContent = `${pageIdx + 1} / ${pageArr.length}`;
    }
  };
  window.prevPage = () => {
    if (pageIdx > 0) {
      flipbook.children[pageIdx].style.display = 'none';
      pageIdx--;
      flipbook.children[pageIdx].style.display = 'block';
      pageNumEl.textContent = `${pageIdx + 1} / ${pageArr.length}`;
    }
  };
  window.backToList = () => {
    bookBox    .classList.remove('viewing');
    selectorBox.style.display = 'block';
    flipbook   .style.display = 'none';
    titleEl    .style.display = 'none';
    pageNumEl  .style.display = 'none';
  };
  window.closeBook = () => {
    bookModal.classList.remove('show');
    bookModal.addEventListener('transitionend', () => {
      bookModal.style.display = 'none';
      flipbook.innerHTML = '';
      bookBox.classList.remove('viewing');
    }, { once: true });
  };

  window.addEventListener('keydown', e => {
    if (bookModal.style.display === 'flex') {
      if (e.key === 'Escape')          closeBook();
      else if (e.key === 'ArrowRight') nextPage();
      else if (e.key === 'ArrowLeft')  prevPage();
    }
  });
  bookModal.addEventListener('click', e => {
    if (e.target === bookModal) closeBook();
  });

});
