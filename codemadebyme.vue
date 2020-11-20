<template>
  <!-- PASTED IN PORTFOLIO -->
  <section class="module-small p-t-20">
    <div class="container">
      <!-- PORTFOLIO FILTER -->
      <div class="row">
        <div class="col-sm-12">
          <input
            class="form-control input-lg"
            type="text"
            v-model="allAttributeFilter"
            placeholder="Search"
          />
          <ul
            v-for="college in colleges"
            id="names"
            class="filter font-inc hidden-xs"
            v-on:click="setSortAttribute('name')"
          >
            <li>
              <router-link
                :to="`/colleges/${college.id}`"
                v-on:click="setSortAttribute('state')"
                class="current wow fadeInUp animated"
                style="visibility: visible; animation-name: fadeInUp;"
                >{{ college.abbreviation }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- /PORTFOLIO FILTER -->
    </div>

    <!-- PORTFOLIO LIST -->
    <ul
      id="works-grid"
      class="works-grid works-grid-3"
      style="position: relative; height: 638.157px;"
    >
      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item illustration webdesign"
        style="position: absolute; left: 0px; top: 0px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-1.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Corporate Identity</h3>
            <div class="work-descr font-inc">
              Illustration
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item marketing photography"
        style="position: absolute; left: 352px; top: 0px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-2.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Bag MockUp</h3>
            <div class="work-descr font-inc">
              Marketing
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item illustration photography"
        style="position: absolute; left: 705px; top: 0px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-3.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Disk Cover</h3>
            <div class="work-descr font-inc">
              Illustration
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item marketing photography"
        style="position: absolute; left: 0px; top: 212px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-4.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Business Card</h3>
            <div class="work-descr font-inc">
              Photography
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item illustration webdesign"
        style="position: absolute; left: 352px; top: 212px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-5.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Business Cards</h3>
            <div class="work-descr font-inc">
              Webdesign
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item marketing webdesign"
        style="position: absolute; left: 705px; top: 212px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-6.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Business Cards in paper clip</h3>
            <div class="work-descr font-inc">
              Marketing
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item marketing webdesign"
        style="position: absolute; left: 0px; top: 425px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-7.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Business Cards in paper clip</h3>
            <div class="work-descr font-inc">
              Marketing
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item marketing webdesign"
        style="position: absolute; left: 352px; top: 425px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-1.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Business Cards in paper clip</h3>
            <div class="work-descr font-inc">
              Marketing
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->

      <!-- PORTFOLIO ITEM -->
      <li
        class="work-item marketing webdesign"
        style="position: absolute; left: 705px; top: 425px;"
      >
        <a href="portfolio-single-1.html">
          <div class="work-image">
            <img src="assets/images/work-2.jpg" alt="" />
          </div>
          <div class="work-caption">
            <h3 class="work-title font-alt">Business Cards in paper clip</h3>
            <div class="work-descr font-inc">
              Marketing
            </div>
          </div>
        </a>
      </li>
      <!-- /PORTFOLIO ITEM -->
    </ul>
    <!-- /PORTFOLIO LIST -->
  </section>
  <!-- /PASTED IN PORTFOLIO -->

  <!-- PORTFOLIO FILTER (THAT I MADE) - FUNCTIONS BUT MAY NOT HAVE RESPONSIVE DESIGN (FROM COLLEGESINDEX.VUE) -->
  <section class="module-small">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="font-inc">
            <input
              type="text"
              v-model="allAttributeFilter"
              placeholder="Search"
            />
            <datalist id="names">
              <option v-for="college in colleges">{{ college.name }}</option>
            </datalist>
            <button v-on:click="setSortAttribute('name')">
              <strong> Sort by Name </strong>
            </button>
            <button v-on:click="setSortAttribute('state')">
              <strong> Sort by State </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /PORTFOLIO FILTER (THAT I MADE) -->

  <!-- Original form the purchased site -->
  <ul id="filters" class="filter font-inc hidden-xs">
    <li>
      <a
        href="#"
        data-filter="*"
        class="current wow fadeInUp animated"
        style="visibility: visible; animation-name: fadeInUp;"
        >All</a
      >
    </li>
    <li>
      <a
        href="#"
        data-filter=".illustration"
        class="wow fadeInUp animated"
        data-wow-delay="0.2s"
        style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;"
        >Illustration</a
      >
    </li>
    <li>
      <a
        href="#"
        data-filter=".marketing"
        class="wow fadeInUp animated"
        data-wow-delay="0.4s"
        style="visibility: visible; animation-delay: 0.4s; animation-name: fadeInUp;"
        >Marketing</a
      >
    </li>
    <li>
      <a
        href="#"
        data-filter=".photography"
        class="wow fadeInUp animated"
        data-wow-delay="0.6s"
        style="visibility: visible; animation-delay: 0.6s; animation-name: fadeInUp;"
        >Photography</a
      >
    </li>
    <li>
      <a
        href="#"
        data-filter=".webdesign"
        class="wow fadeInUp animated"
        data-wow-delay="0.8s"
        style="visibility: visible; animation-delay: 0.8s; animation-name: fadeInUp;"
        >Web Design</a
      >
    </li>
  </ul>
  <!-- /Original form the purchased site -->
</template>

<div class="">
                <div>
                  <!-- START OF PASTED IN -->
                  <!-- TABS -->
                  <h5 class="font-alt m-b-0">Are You A Student Artist?</h5>
                  <hr class="divider-w m-t-10 m-b-20" />

                  <div role="tabpanel">
                    <!-- Nav tabs start-->
                    <ul
                      class="nav nav-tabs font-inc text-uppercase"
                      role="tablist"
                    >
                      <li class="">
                        <a href="#yes" data-toggle="tab" aria-expanded="false"
                          ><span class="icon-paintbrush"></span> Yes</a
                        >
                      </li>
                      <li class="active">
                        <a href="#no" data-toggle="tab" aria-expanded="true"
                          ><span class="icon-profile-male"></span> No</a
                        >
                      </li>
                    </ul>
                    <!-- Nav tabs end -->

                    <!-- Tab panes start-->
                    <div class="tab-content">
                      <!-- Tab start -->
                      <div v-on:click="artist = true" class="tab-pane" id="yes">
                        <!-- MY ATTEMPT TO HAVE THE ARTIST ATTRIBUTE CHANGE -->

                        <div class="form-group">
                          <label>Select a College:</label><br />
                          <select class="form-control" v-model="collegeId">
                            <option
                              v-for="college in colleges"
                              v-bind:value="college.id"
                            >
                              {{ college.name }}
                            </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control input-lg"
                            type="text"
                            placeholder="Major"
                            v-model="major"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control input-lg"
                            type="text"
                            placeholder="Minor"
                            v-model="minor"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control input-lg"
                            type="number"
                            placeholder="Graduation Year"
                            v-model="graduation_year"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control input-lg"
                            type="text"
                            placeholder="Style of Art"
                            v-model="art_style"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            class="form-control input-lg"
                            type="text"
                            placeholder="Bio (500 Character Max)"
                            v-model="bio"
                          />
                        </div>
                        <div class="form-group">
                          <label>Profile Image:</label>
                          <input
                            class="form-control input-lg"
                            type="file"
                            v-on:change="setFile($event)"
                            ref="fileInput"
                          />
                        </div>
                      </div>
                      <!-- Tab end -->

                      <!-- Tab start -->
                      <div
                        class="tab-pane active"
                        id="no"
                        v-on:click="artist = false"
                      >
                        <!-- MY ATTEMPT TO HAVE THE ARTIST ATTRIBUTE CHANGE -->
                        Welcome to the community!
                      </div>
                      <!-- Tab end -->
                    </div>
                    <!-- Tab panes end-->
                  </div>
                  <!-- /TABS -->
                </div>
                <!-- END OF PASTED IN -->
              </div>
