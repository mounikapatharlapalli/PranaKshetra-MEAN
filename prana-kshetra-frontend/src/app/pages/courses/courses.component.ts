import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // Active category filter
  activeCategory: string = 'All';

  // Categories and Subcategories
  categories = [
    {
      name: 'Yoga',
      subcategories: ['Beginner', 'Intermediate', 'Advanced', 'Children']
    },
    {
      name: 'Specific Concerns',
      subcategories: ['Cardiac & Hypertension', 'Diabetes', 'Prenatal Disorders', 'Thyroid', 'PCOD', 'Weight Loss']
    },
    {
      name: 'Meditation',
      subcategories: ['Beginner', 'Intermediate', 'Advanced', 'Therapy', 'Health & Wellness']
    },
    {
      name: 'Types',
      subcategories: ['Hatha', 'Surya Kriya', 'Corporate Yoga', 'Inner Engineering', 'Pilates', 'Chanting']
    },
    {
      name: 'Food',
      subcategories: [
        '3 Months Ultimate Food Challenge',
        'Health Concerns Specific Diet',
        'Glow Diet',
        'Weight Loss Diet'
      ]
    }
  ];

  // Complete Courses List
  courses = [
    // YOGA
    {
      title: 'Beginner Yoga',
      category: 'Yoga',
      subcategory: 'Beginner',
      image: 'https://i.pinimg.com/736x/57/0b/34/570b34e74a522417b21fa754b0330624.jpg',
      description: 'Start your yoga journey with fundamental postures and breathing techniques.'
    },
    {
      title: 'Intermediate Yoga Flow',
      category: 'Yoga',
      subcategory: 'Intermediate',
      image: 'https://i.pinimg.com/736x/3d/07/33/3d0733a56d799ed49e40f4649072babf.jpg',
      description: 'Advance your practice with dynamic flows and deeper stretches.'
    },
    {
      title: 'Advanced Yoga Flow',
      category: 'Yoga',
      subcategory: 'Advanced',
      image: 'https://i.pinimg.com/736x/bb/39/d5/bb39d596363a39744382729d595ef49d.jpg',
      description: 'Master complex poses and build endurance in this advanced yoga series.'
    },
    {
      title: 'Children Yoga Flow',
      category: 'Yoga',
      subcategory: 'Children',
      image: 'https://i.pinimg.com/736x/df/d5/f5/dfd5f5715f98c36273ceddc26af8917c.jpg',
      description: 'Fun and engaging yoga designed specially for children.'
    },

    // SPECIFIC CONCERNS
    {
      title: 'Cardiac & Hypertension Yoga',
      category: 'Specific Concerns',
      subcategory: 'Cardiac & Hypertension',
      image: 'https://i.pinimg.com/736x/63/9b/a6/639ba610eb935985edafe895edcc09e4.jpg',
      description: 'Gentle yoga flows tailored to support heart health and manage hypertension.'
    },
    {
      title: 'Diabetes Control Yoga',
      category: 'Specific Concerns',
      subcategory: 'Diabetes',
      image: 'https://i.pinimg.com/736x/ff/c4/74/ffc474063b4c14edf1a9f49dfeb15843.jpg',
      description: 'Empower yourself with yoga routines designed to help regulate blood sugar levels.'
    },
    {
      title: 'Prenatal Yoga Program',
      category: 'Specific Concerns',
      subcategory: 'Prenatal Disorders',
      image: 'https://i.pinimg.com/736x/25/03/33/2503338c9f31450de43da1dfc30e1ff9.jpg',
      description: 'Stay active and relaxed during pregnancy with safe and supportive yoga.'
    },
    {
      title: 'Thyroid Care Yoga',
      category: 'Specific Concerns',
      subcategory: 'Thyroid',
      image: 'https://i.pinimg.com/736x/33/a4/6b/33a46b254ef6595478d8cae06645047a.jpg',
      description: 'Specific postures to help regulate and support thyroid health.'
    },
    {
      title: 'PCOD Wellness Yoga',
      category: 'Specific Concerns',
      subcategory: 'PCOD',
      image: 'https://i.pinimg.com/736x/47/18/02/4718021c8c511f3e546f6f67912c534c.jpg',
      description: 'Comprehensive yoga routines for managing PCOD symptoms and improving hormonal balance.'
    },
    {
      title: 'Weight Loss Yoga Program',
      category: 'Specific Concerns',
      subcategory: 'Weight Loss',
      image: 'https://i.pinimg.com/736x/ff/75/7c/ff757c78e9476f3b9f1c98ab08279741.jpg',
      description: 'Burn calories and tone your body with this intensive weight loss yoga series.'
    },

    // MEDITATION
    {
      title: 'Beginner Meditation Techniques',
      category: 'Meditation',
      subcategory: 'Beginner',
      image: 'https://i.pinimg.com/736x/62/5e/75/625e75a699e9667059d5097825a1f23e.jpg',
      description: 'Learn the basics of mindfulness and breath control for beginners.'
    },
    {
      title: 'Intermediate Meditation Practices',
      category: 'Meditation',
      subcategory: 'Intermediate',
      image: 'https://i.pinimg.com/736x/8e/74/d9/8e74d96c1af911f357b2fee2eee4d770.jpg',
      description: 'Take your meditation deeper with focused awareness techniques.'
    },
    {
      title: 'Advanced Meditation Techniques',
      category: 'Meditation',
      subcategory: 'Advanced',
      image: 'https://i.pinimg.com/736x/7e/cc/bc/7eccbc8d9cad8b3194c38de677517b9c.jpg',
      description: 'Master advanced practices to deepen concentration and inner stillness.'
    },
    {
      title: 'Therapeutic Meditation Program',
      category: 'Meditation',
      subcategory: 'Therapy',
      image: 'https://i.pinimg.com/736x/5f/aa/80/5faa80b13d2a346e89aed1721fd3777a.jpg',
      description: 'Reduce stress, anxiety, and emotional imbalances with therapeutic meditation.'
    },
    {
      title: 'Health & Wellness Meditation',
      category: 'Meditation',
      subcategory: 'Health & Wellness',
      image: 'https://i.pinimg.com/736x/17/4c/36/174c36d6b0590f1960f24bc5ba346565.jpg',
      description: 'Meditation techniques designed to promote overall health and inner peace.'
    },

    // TYPES
    {
      title: 'Hatha Yoga Essentials',
      category: 'Types',
      subcategory: 'Hatha',
      image: 'https://i.pinimg.com/474x/4e/ff/ba/4effba1efefb033085b0a4000c0ad887.jpg',
      description: 'Traditional Hatha yoga sequences to harmonize body and mind.'
    },
    {
      title: 'Surya Kriya Masterclass',
      category: 'Types',
      subcategory: 'Surya Kriya',
      image: 'https://i.pinimg.com/736x/da/8a/21/da8a21a82fd4ed3c50690dfe98f9d6a7.jpg',
      description: 'Awaken your energy with ancient Surya Kriya techniques.'
    },
    {
      title: 'Corporate Yoga Program',
      category: 'Types',
      subcategory: 'Corporate Yoga',
      image: 'https://i.pinimg.com/736x/ff/53/a2/ff53a2135d5df6569320bffd99539a05.jpg',
      description: 'Boost productivity and reduce stress with office-friendly yoga practices.'
    },
    {
      title: 'Inner Engineering Program',
      category: 'Types',
      subcategory: 'Inner Engineering',
      image: 'https://i.pinimg.com/736x/67/75/ae/6775ae5c934b2b190631106bd28b3f9d.jpg',
      description: 'Transform your life with the Inner Engineering yogic system.'
    },
    {
      title: 'Pilates Core Strength',
      category: 'Types',
      subcategory: 'Pilates',
      image: 'https://i.pinimg.com/736x/a0/ca/86/a0ca862c99e6889c3b23d65baa02bc79.jpg',
      description: 'Strengthen your core and improve posture with Pilates routines.'
    },
    {
      title: 'Chanting Mantras',
      category: 'Types',
      subcategory: 'Chanting',
      image: 'https://i.pinimg.com/736x/77/04/81/770481e6a1182edd654917a8a6f545fa.jpg',
      description: 'Experience deep relaxation and mental clarity through ancient chants.'
    },

    // FOOD & DIET
    {
      title: '3 Months Ultimate Food Challenge',
      category: 'Food',
      subcategory: '3 Months Ultimate Food Challenge',
      image: 'https://i.pinimg.com/736x/d9/b2/e5/d9b2e5484ed104e98891db84221777a7.jpg',
      description: 'Transform your eating habits over 90 days for lasting health benefits.'
    },
    {
      title: 'Health Concerns Specific Diet',
      category: 'Food',
      subcategory: 'Health Concerns Specific Diet',
      image: 'https://i.pinimg.com/736x/d9/54/35/d954357abad1121c1c5c8de35596f530.jpg',
      description: 'Personalized diet plans for managing health concerns effectively.'
    },
    {
      title: 'Glow Diet Plan',
      category: 'Food',
      subcategory: 'Glow Diet',
      image: 'https://i.pinimg.com/736x/70/82/2d/70822d5862cd0eefb1724b286ef10905.jpg',
      description: 'Boost your skin health and glow from within with our specialized diet plan.'
    },
    {
      title: 'Weight Loss Diet Plan',
      category: 'Food',
      subcategory: 'Weight Loss Diet',
      image: 'https://i.pinimg.com/736x/ee/97/9c/ee979c186ac281aeb9f63b8b00b64093.jpg' ,
      description: 'Achieve your weight loss goals with our balanced and effective diet program.'
    }
  ];

  // Filter by category
  filterCourses(category: string) {
    this.activeCategory = category;
  }

  // Return filtered list of courses
  filteredCourses() {
    if (this.activeCategory === 'All') {
      return this.courses;
    }
    return this.courses.filter(course => course.category === this.activeCategory);
  }
}
