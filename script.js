document.addEventListener('DOMContentLoaded', () => {

  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const images   = ['img/project-image1.jpg','img/project-image2.jpg','img/project-image3.jpg'];
  let   imgIdx   = 0, zoom = 1;
  const modalImg = $('#modal-img') || document.createElement('img');

  window.openSimpleModal = () => { imgIdx = 0; zoom = 1; $('#modal').style.display = 'flex'; showImg(); };
  const showImg          = () => { modalImg.src = images[imgIdx]; modalImg.style.transform = `scale(${zoom})`; };
  window.closeModal      = () => { $('#modal').style.display = 'none'; };
  window.zoomImage       = f => { zoom *= f; showImg(); };
  window.resetZoom       = () => { zoom = 1; showImg(); };
  window.prevImage       = () => { if (imgIdx > 0)                 imgIdx--; showImg(); };
  window.nextImage       = () => { if (imgIdx < images.length - 1) imgIdx++; showImg(); };

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

  $('#sidebar-toggle')?.addEventListener('click', e => {
      $('.sidebar')?.classList.toggle('collapsed');
      $('.layout') ?.classList.toggle('collapsed');
      e.currentTarget.textContent = e.currentTarget.textContent === '☰' ? '×' : '☰';
  });

  $('#nav-toggle')?.addEventListener('click', () => $('#nav-menu')?.classList.toggle('active'));

  $('#download-pdf')?.addEventListener('click', () => {
    window.print();
  });


  new TypeIt('#typeit', { speed: 50, startDelay: 300 })
     .type('안녕하세요 :) Python, Java 기반의 서버 개발과 데이터 처리를 즐기는 백엔드 주니어 개발자 박수민입니다.')
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
          closeX = modal.querySelector('.modal-close');

    window.openVideoModal = src => {
      if (src) video.querySelector('source').src = src;
      video.load();
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('show'));
      video.currentTime = 0; video.play();
    };
    const close = () => {
      modal.classList.remove('show');
      video.pause(); video.currentTime = 0;
      modal.addEventListener('transitionend', () => modal.style.display = 'none', { once: true });
    };
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
      '청소년정신건강':    Array.from({ length: 8  }, (_, i) => `img/book/청소년정신건강분석/청소년정신건강분석_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '지하철 이용현황':  Array.from({ length: 6  }, (_, i) => `img/book/지하철이용현황분석/지하철이용현황분석_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '인천공항 이용자수': Array.from({ length: 7  }, (_, i) => `img/book/인천공항이용자수/인천공항이용자수_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '연령별 취업자수':  Array.from({ length: 9  }, (_, i) => `img/book/연령별-취업자수/연령별 취업자수_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '연령별 인구 분포 분석': Array.from({ length: 19 }, (_, i) => `img/book/연령별-인구-분포-분석/연령별 인구 분포 분석_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '쇼핑몰 시각화':   Array.from({ length: 5  }, (_, i) => `img/book/쇼핑몰-시각화/쇼핑몰 시각화_page-${String(i + 1).padStart(4, '0')}.jpg`),
      'CCTV 위치분석':   Array.from({ length: 15 }, (_, i) => `img/book/범행CCTV인구데이터분석/범행CCTV인구데이터분석_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '교통사고유형별발생': Array.from({ length: 20 }, (_, i) => `img/book/교통사고유형별발생/교통사고유형별발생_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '팀문화분석':      Array.from({ length: 9  }, (_, i) => `img/book/팀문화분석seaborn/팀문화분석(seaborn)_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '공간정보':        Array.from({ length: 5  }, (_, i) => `img/book/공간정보/공간정보_page-${String(i + 1).padStart(4, '0')}.jpg`)
    },
    crawling: {
      '셀레니움1':     Array.from({ length: 9  }, (_, i) => `img/book/셀레니움크롤링/셀레니움크롤링_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '셀레니움2':     Array.from({ length: 15 }, (_, i) => `img/book/셀레니움크롤링2/셀레니움크롤링2_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '셀레니움3':     Array.from({ length: 21 }, (_, i) => `img/book/셀레니움크롤링3/셀레니움크롤링3_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '크롤링_스타벅스': Array.from({ length: 21 }, (_, i) => `img/book/크롤링-스타벅스/크롤링 스타벅스_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '인스타크롤링':   Array.from({ length: 11 }, (_, i) => `img/book/인스타크롤링/인스타크롤링_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '주유소크롤링1':  Array.from({ length: 6  }, (_, i) => `img/book/주유소크롤링1/주유소크롤링1_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '주유소크롤링2':  Array.from({ length: 8  }, (_, i) => `img/book/주유소크롤링2/주유소크롤링2_page-${String(i + 1).padStart(4, '0')}.jpg`),
      '최저가주유':     Array.from({ length: 30 }, (_, i) => `img/book/최저가주유/최저가주유_page-${String(i + 1).padStart(4, '0')}.jpg`)
    }
  };

  const bookModal   = $('#book-modal'),
        selectorBox = $('#book-selector'),
        flipbook    = $('#flipbook'),
        titleEl     = $('#book-title'),
        pageNumEl   = $('.page-number');

  let pageArr = [], pageIdx = 0;

  window.openBookModal = category => {
    bookModal.style.display = 'flex';
    requestAnimationFrame(() => bookModal.classList.add('show'));

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
      img.src = src; img.className = 'book-page';
      img.style.display = i ? 'none' : 'block';
      flipbook.appendChild(img);
    });

    pageIdx = 0;
    selectorBox.style.display = 'block none'.split(' ')[0]; 
    selectorBox.style.display = 'none';
    flipbook   .style.display = 'flex';
    titleEl    .textContent   = title;
    titleEl    .style.display = 'block';
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
