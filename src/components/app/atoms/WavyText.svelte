<span class="wavy"><slot /></span>

<style>
  .wavy {
    position: relative;
  }

  .wavy::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 3px);
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.942398 13C8.428 13 8.428 3 15.896 3C23.3818 3 23.3818 13 30.8497 13" stroke="%2347DCFF" stroke-width="6" stroke-miterlimit="10" stroke-linecap="square"/></svg>');
    background-position-x: 0;
    background-position-y: 100%;
    background-repeat: repeat-x;
    background-size: 25px auto;
    animation: move 800ms linear infinite;
    z-index: -1;
  }

  @keyframes move {
    from {
      background-position-x: 0;
    }
    to {
      background-position-x: 25px;
    }
  }
</style>
